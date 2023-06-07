import { ApiProperty } from '@nestjs/swagger';
import { driverStatus } from '../driver.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class StatusChangeDto {
  @ApiProperty({
    example: 'b20649d2-9853-4add-a968-4f144064340b',
    description: 'Driver identifier',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'b20649d2-9853-4add-a968-4f144064340b',
    description: 'Driver identifier',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  status: driverStatus;
}
