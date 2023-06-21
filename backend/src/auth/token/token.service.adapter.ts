import { Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import { Driver } from '../../driver/driver.entity';
import { DriverAuthResponseDto } from '../dto/driver-auth-response.dto';

@Injectable()
export class TokenServiceAdapter {
  constructor(private readonly tokenService: TokenService) {}

  async getTokens(driver: Driver): Promise<DriverAuthResponseDto> {
    const accessToken = await this.tokenService.generateAccessToken(driver);
    const refreshToken = await this.tokenService.generateRefreshToken(driver);
    return { accessToken, refreshToken };
  }

  async refreshToken(
    accessToken: string,
    refreshToken: string,
  ): Promise<DriverAuthResponseDto> {
    return this.tokenService.refreshToken(accessToken, refreshToken);
  }
}
