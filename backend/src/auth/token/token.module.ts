import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { DriverModule } from '../../driver/driver.module';
import { TokenServiceAdapter } from './token.service.adapter';

@Module({
  imports: [DriverModule],
  providers: [TokenService, TokenServiceAdapter, JwtService],
  exports: [TokenService, TokenServiceAdapter],
})
export class TokenModule {}
