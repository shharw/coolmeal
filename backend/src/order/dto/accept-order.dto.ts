import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AcceptOrderDto {
  @ApiProperty({
    example: 'b20649d2-9853-4add-a968-4f144064340b',
    description: 'Order identifier',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    example: 'b20649d2-9853-4add-a968-4f144064340b',
    description: 'Driver identifier',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  driverId: string;
}
