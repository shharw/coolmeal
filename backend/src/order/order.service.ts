import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverService } from '../driver/driver.service';
import { AcceptOrderDto } from './dto/accept-order.dto';
import { Driver } from '../driver/driver.entity';
import { OrderFactory } from './order.factory';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @Inject(forwardRef(() => DriverService))
    private readonly driverService: DriverService,
    private readonly orderFactory: OrderFactory,
  ) {}

  async getOrder(id: string): Promise<Order> {
    return await this.orderRepository.findOne({ where: { id } });
  }

  async save(order: Order): Promise<Order> {
    return await this.orderRepository.save(order);
  }

  async getAllActiveOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      where: {
        status: 'active',
      },
    });
  }

  async getAllPendingOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      where: {
        status: 'pending',
      },
    });
  }

  async getAllCompletedOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      where: {
        status: 'completed',
      },
    });
  }

  async generateOrders(): Promise<Order> {
    return await this.orderFactory.createOrder();
  }

  async acceptOrder(acceptOrderDto: AcceptOrderDto): Promise<void> {
    const driver: Driver = await this.driverService.findOneById(
      acceptOrderDto.driverId,
    );
    const order: Order = await this.orderRepository.findOne({
      where: { id: acceptOrderDto.orderId },
    });
    order.driver = driver;
    order.status = 'pending';
    driver.status = 'to_restaurant';
    await this.driverService.saveDriver(driver);
    await this.orderRepository.save(order);
  }
}
