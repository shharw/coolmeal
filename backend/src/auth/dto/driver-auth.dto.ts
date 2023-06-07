import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DriverAuthDto {
  @ApiProperty({
    example: 'john3123',
    description: 'Driver login for login',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'qwertyui123456',
    description: 'Driver password for login',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
