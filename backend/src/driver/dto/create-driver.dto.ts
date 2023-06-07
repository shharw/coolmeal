import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({
    example: '+11 (111) 111-1111',
    description: 'Driver phone',
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    example: 'john12321',
    description: 'Driver login',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: 'qwertyui123456',
    description: 'Driver password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain uppercase, lowercase letters and a number',
  })
  password: string;
}
