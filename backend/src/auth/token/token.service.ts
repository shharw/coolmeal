import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DriverAuthResponseDto } from '../dto/driver-auth-response.dto';
import * as bcrypt from 'bcrypt';
import { DriverService } from '../../driver/driver.service';
import { Driver } from '../../driver/driver.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly driverService: DriverService,
  ) {}

  async generateAccessToken(driver: Driver): Promise<string> {
    const payload = { id: driver.id, login: driver.login };
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.EXPIRE_ACCESS_JWT,
    });
  }

  async generateRefreshToken(driver: Driver): Promise<string> {
    const payload = { login: driver.login };
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.EXPIRE_REFRESH_JWT,
    });
  }

  async getTokens(driver: Driver): Promise<DriverAuthResponseDto> {
    const accessToken = await this.generateAccessToken(driver);
    const refreshToken = await this.generateRefreshToken(driver);
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await this.driverService.hashData(refreshToken);
    await this.driverService.update(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshToken(
    accessToken: string,
    refreshToken: string,
  ): Promise<DriverAuthResponseDto> {
    const decodedAccessToken = await this.decodeToken(accessToken);
    const driverId = decodedAccessToken.id;
    const driver: Driver = await this.driverService.findOneById(driverId);
    if (!driver || !driver.refreshToken)
      throw new NotFoundException('Driver or refresh token not found');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      driver.refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Refresh token is invalid');
    }
    const tokens = await this.getTokens(driver);
    await this.updateRefreshToken(driver.id, tokens.refreshToken);
    return { id: driver.id, ...tokens };
  }

  async decodeToken(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }
}
