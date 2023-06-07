import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { driverStatus } from '../driver.entity';

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

  @ApiProperty({
    example: '123',
    description: 'Driver balance',
  })
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiProperty({
    example: 'free',
    description: 'Driver status',
  })
  @IsString()
  @IsOptional()
  status?: driverStatus;

  public constructor() {}

  static builder(): CreateDriverDtoBuilder {
    return new CreateDriverDtoBuilder();
  }
}

export class CreateDriverDtoBuilder {
  private dto: CreateDriverDto;

  constructor() {
    this.dto = new CreateDriverDto();
  }

  withPhoneNumber(phoneNumber: string): CreateDriverDtoBuilder {
    this.dto.phone_number = phoneNumber;
    return this;
  }

  withLogin(login: string): CreateDriverDtoBuilder {
    this.dto.login = login;
    return this;
  }

  withPassword(password: string): CreateDriverDtoBuilder {
    this.dto.password = password;
    return this;
  }

  withBalance(balance: number): CreateDriverDtoBuilder {
    this.dto.balance = balance;
    return this;
  }

  withStatus(status: driverStatus): CreateDriverDtoBuilder {
    this.dto.status = status;
    return this;
  }

  build(): CreateDriverDto {
    return this.dto;
  }
}
