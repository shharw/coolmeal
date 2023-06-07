import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './driver.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Order } from '../order/order.entity';
import { StatusChangeDto } from './dto/status-change.dto';
import { AcceptOrderDto } from '../order/dto/accept-order.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}

  async hashData(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(process.env.PASSWORD_SALT));
  }

  async create(createDriverDto: CreateDriverDto): Promise<void> {
    createDriverDto.password = await this.hashData(createDriverDto.password);
    const driver: Driver = await this.driverRepository.create({
      ...createDriverDto,
      balance: 0,
      status: 'free',
    });
    await this.driverRepository.save(driver);
  }

  async findOneByLogin(login: string) {
    return await this.driverRepository.findOne({ where: { login } });
  }

  async findOneById(id: string) {
    return await this.driverRepository.findOne({ where: { id } });
  }

  async getDriver(id: string) {
    const driver: Driver = await this.driverRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    const orders: Order[] = driver.orders.filter(
      (order: Order) => order.status === 'pending',
    );
    driver.orders = orders;
    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<void> {
    await this.findOneById(id);
    await this.driverRepository.update(id, updateDriverDto);
  }

  async getPendingOrders(id: string): Promise<Order[]> {
    const driver: Driver = await this.driverRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (driver) {
      const orders: Order[] = driver.orders.filter(
        (order: Order) => order.status === 'pending',
      );
      console.log(orders);
      return orders;
    } else throw new NotFoundException();
  }

  async saveDriver(driver: Driver): Promise<void> {
    await this.driverRepository.save(driver);
  }

  async changeStatus(statusChangeDto: StatusChangeDto): Promise<void> {
    const driver: Driver = await this.driverRepository.findOne({
      where: { id: statusChangeDto.id },
    });
    driver.status = statusChangeDto.status;
    await this.driverRepository.save(driver);
  }

  async getBalance(id: string): Promise<number> {
    const driver: Driver = await this.driverRepository.findOne({
      where: { id },
    });
    return driver.balance;
  }

  async completeOrder(acceptOrderDto: AcceptOrderDto): Promise<void> {
    const order: Order = await this.orderService.getOrder(
      acceptOrderDto.orderId,
    );
    const payment = order.deliveryPrice;
    const driver: Driver = await this.driverRepository.findOne({
      where: { id: acceptOrderDto.driverId },
    });
    driver.balance += payment;
    driver.status = 'free';
    order.status = 'completed';
    await this.orderService.save(order);
    await this.driverRepository.save(driver);
  }
}
