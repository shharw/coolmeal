import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenService } from './token/token.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { DriverAuthResponseDto } from './dto/driver-auth-response.dto';
import { DriverAuthDto } from './dto/driver-auth.dto';
import { Response, Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiOperation({ summary: 'Register driver' })
  @ApiResponse({ status: 201, type: DriverAuthResponseDto })
  @Post('registration')
  registerDriver(@Body() createDriverDto: CreateDriverDto): Promise<any> {
    return this.authService.registration(createDriverDto);
  }

  @ApiOperation({ summary: 'Login driver' })
  @ApiResponse({ status: 200, type: DriverAuthResponseDto })
  @Post('login')
  async loginDriver(
    @Body() loginDriverDto: DriverAuthDto,
    @Res() response: Response,
  ): Promise<void> {
    const driverAuthResponseDto: DriverAuthResponseDto =
        await this.authService.login(loginDriverDto);
    response.cookie('refreshToken', driverAuthResponseDto.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    response.send({
      id: driverAuthResponseDto.id,
      accessToken: driverAuthResponseDto.accessToken,
    });
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Logout driver' })
  @ApiResponse({ status: 200 })
  @Get('logout/:id')
  logout(@Param('id') id: string): Promise<void> {
    return this.authService.logout(id);
  }

  @ApiOperation({ summary: 'Regenerate driver tokens' })
  @ApiResponse({ status: 200 })
  @Patch('refresh')
  async refreshTokens(
    @Body() body,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const { refreshToken } = request.cookies;
    const driverAuthResponseDto: DriverAuthResponseDto =
      await this.tokenService.refreshToken(body.accessToken, refreshToken);
    response.cookie('refreshToken', driverAuthResponseDto.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    response.send({
      id: driverAuthResponseDto.id,
      accessToken: driverAuthResponseDto.accessToken,
    });
  }
}
