import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { DriverModule } from '../../driver/driver.module';

@Module({
  imports: [DriverModule],
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
