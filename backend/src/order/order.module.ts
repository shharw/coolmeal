import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { DriverModule } from '../driver/driver.module';
import { OrderFactory } from './order.factory';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderFactory],
  imports: [TypeOrmModule.forFeature([Order]), forwardRef(() => DriverModule)],
  exports: [OrderService],
})
export class OrderModule {}
