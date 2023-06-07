import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { OrderModule } from '../order/order.module';

@Module({
  controllers: [DriverController],
  providers: [DriverService],
  imports: [TypeOrmModule.forFeature([Driver]), OrderModule],
  exports: [DriverService],
})
export class DriverModule {}
