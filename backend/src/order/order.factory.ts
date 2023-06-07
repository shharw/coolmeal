import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class OrderFactory {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  clientAddresses: string[] = [
    'вулиця Шевченка, 12, Миколаїв, Україна',
    'проспект Перемоги, 45, Миколаїв, Україна',
    'вулиця Гагаріна, 32, Миколаїв, Україна',
    'проспект Леніна, 87, Миколаїв, Україна',
    'вулиця Потьомкінська, 54, Миколаїв, Україна',
    'проспект Миру, 23, Миколаїв, Україна',
    'вулиця Фрунзе, 71, Миколаїв, Україна',
    'проспект Театральний, 8, Миколаїв, Україна',
    'вулиця Соборна, 98, Миколаїв, Україна',
    'проспект Адмірала Макарова, 19, Миколаїв, Україна',
  ];

  restaurantAddresses: string[] = [
    'вулиця Московська, 10, Миколаїв, Україна',
    'проспект Центральний, 33, Миколаїв, Україна',
    'вулиця Героїв України, 16, Миколаїв, Україна',
    'проспект Миру, 55, Миколаїв, Україна',
    'вулиця Володимирська, 42, Миколаїв, Україна',
    'проспект Олександрійський, 21, Миколаїв, Україна',
    'вулиця Фонтанна, 77, Миколаїв, Україна',
    'проспект Богоявленський, 12, Миколаїв, Україна',
    'вулиця Спортивна, 9, Миколаїв, Україна',
    'проспект Заводський, 63, Миколаїв, Україна',
  ];

  async createOrder(): Promise<Order> {
    const order: Order = this.orderRepository.create({
      restaurant: faker.company.name(),
      clientName: faker.person.fullName(),
      clientPhone: faker.phone.number('+380 ## ### ## ##'),
      clientAddress: faker.helpers.arrayElement(this.clientAddresses),
      restaurantAddress: faker.helpers.arrayElement(this.restaurantAddresses),
      deliveryPrice: faker.number.int({ min: 50, max: 300 }),
      status: 'active',
    });
    await this.orderRepository.save(order);
    return order;
  }
}
