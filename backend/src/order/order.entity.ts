import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Driver } from '../driver/driver.entity';

export type orderStatus = 'active' | 'pending' | 'completed';

@Entity({ name: 'order' })
export class Order {
  @ApiProperty({
    example: 'b20649d2-9853-4add-a968-4f144064340b',
    description: 'Identifier',
    required: false,
  })
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk_order_id',
  })
  id: string;

  @ApiProperty({
    example: 'Zieme, Hauck and McClure',
    description: 'Restaurant name',
  })
  @Column({
    nullable: false,
    type: 'varchar',
    default: '',
  })
  restaurant: string;

  @ApiProperty({ example: 'John', description: 'Client name' })
  @Column({ nullable: false, type: 'varchar', name: 'client_name' })
  clientName: string;

  @ApiProperty({
    example: '+11 (111) 111-1111',
    description: 'Client phone',
  })
  @Column({ nullable: false, type: 'varchar', name: 'client_phone' })
  clientPhone: string;

  @ApiProperty({
    example: '111 Vernon Trail',
    description: 'Client address',
  })
  @Column({ nullable: false, type: 'varchar', name: 'client_address' })
  clientAddress: string;

  @ApiProperty({
    example: '111 Vernon Trail',
    description: 'Restaurant address',
  })
  @Column({ nullable: false, type: 'varchar', name: 'restaurant_address' })
  restaurantAddress: string;

  @ApiProperty({ example: '150', description: 'Delivery price' })
  @Column({ nullable: false, name: 'delivery_price', type: 'integer' })
  deliveryPrice: number;

  @ApiProperty({ example: 'Active', description: 'Order status' })
  @Column({ nullable: false, type: 'varchar' })
  status: orderStatus;

  @ManyToOne(() => Driver, (driver) => driver.orders, { nullable: true })
  driver: Driver;
}
