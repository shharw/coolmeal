import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DriverAuthDto } from './dto/driver-auth.dto';
import * as bcrypt from 'bcrypt';
import { TokenServiceAdapter } from './token/token.service.adapter';
import { DriverAuthResponseDto } from './dto/driver-auth-response.dto';
import { DriverService } from '../driver/driver.service';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { Driver } from '../driver/driver.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly driverService: DriverService,
    private readonly tokenServiceAdapter: TokenServiceAdapter,
  ) {}

  async registration(createDriverDto: CreateDriverDto): Promise<any> {
    const driverExist: Driver = await this.driverService.findOneByLogin(
      createDriverDto.login,
    );
    if (driverExist) {
      throw new BadRequestException('Driver already exists');
    }
    await this.driverService.create(createDriverDto);
    return { message: 'Driver registered' };
  }

  async login(driverAuthDto: DriverAuthDto): Promise<DriverAuthResponseDto> {
    const driverExist: Driver = await this.driverService.findOneByLogin(
      driverAuthDto.login,
    );
    if (!driverExist)
      throw new NotFoundException('User email or password incorrect');
    const validatePassword: boolean = await bcrypt.compare(
      driverAuthDto.password,
      driverExist.password,
    );
    if (!validatePassword)
      throw new NotFoundException('User email or password incorrect');
    const tokens = await this.tokenServiceAdapter.getTokens(driverExist);
    await this.tokenServiceAdapter.refreshToken(
      driverExist.id,
      tokens.refreshToken,
    );
    return { id: driverExist.id, ...tokens };
  }

  async logout(id: string): Promise<void> {
    const driver = await this.driverService.findOneById(id);
    if (!driver.refreshToken) throw new BadRequestException('Driver not found');
    await this.driverService.update(id, { refreshToken: null });
  }
}
