import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../order/order.entity';

export type driverStatus = 'free' | 'to_restaurant' | 'to_client';

@Entity({ name: 'driver' })
export class Driver {
  @ApiProperty({
    example: 'b20649d2-9853-4add-a968-4f144064340b',
    description: 'Identifier',
    required: false,
  })
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk_driver_id',
  })
  id: string;

  @ApiProperty({
    example: '+11 (111) 111-1111',
    description: 'Driver phone',
  })
  @Column({
    nullable: false,
    type: 'varchar',
    name: 'phone_number',
    default: '',
  })
  phone_number: string;

  @ApiProperty({
    example: 'john12321',
    description: 'Driver login',
  })
  @Column({ nullable: false, type: 'varchar' })
  login: string;

  @ApiProperty({
    example: 'qwertyui123456',
    description: 'Driver password',
  })
  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @ApiProperty({ example: '150', description: 'Driver balance' })
  @Column({ nullable: false, type: 'integer' })
  balance: number;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Driver refresh token',
  })
  @Column({
    nullable: true,
    type: 'varchar',
    default: '',
  })
  refreshToken?: string;

  @ApiProperty({ example: 'Free', description: 'Driver status' })
  @Column({ nullable: false, type: 'varchar', default: 'free' })
  status: driverStatus;

  @OneToMany(() => Order, (order) => order.driver)
  orders: Order[];
}
