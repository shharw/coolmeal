import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Zieme, Hauck and McClure',
    description: 'Restaurant name',
  })
  @IsString()
  @IsNotEmpty()
  restaurant: string;

  @ApiProperty({ example: 'John', description: 'Client name' })
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({
    example: '+11 (111) 111-1111',
    description: 'Client phone',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  clientPhone: string;

  @ApiProperty({
    example: '111 Vernon Trail',
    description: 'Client address',
  })
  @IsString()
  @IsNotEmpty()
  clientAddress: string;

  @ApiProperty({
    example: '111 Vernon Trail',
    description: 'Restaurant address',
  })
  @IsString()
  @IsNotEmpty()
  restaurantAddress: string;

  @ApiProperty({ example: '150', description: 'Delivery price' })
  @IsNumber()
  @IsNotEmpty()
  deliveryPrice: number;

  @ApiProperty({ example: 'Active', description: 'Order status' })
  @IsNotEmpty()
  @IsString()
  status: string;
}
