import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Order } from '../order/order.entity';
import { StatusChangeDto } from './dto/status-change.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AcceptOrderDto } from '../order/dto/accept-order.dto';
import { Driver } from './driver.entity';

@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiOperation({ summary: 'Create driver' })
  @ApiResponse({ status: 201 })
  @Post()
  async create(@Body() createDriverDto: CreateDriverDto): Promise<void> {
    return this.driverService.create(createDriverDto);
  }

  @ApiOperation({ summary: 'Create driver' })
  @ApiResponse({ status: 201 })
  @Get('driver/:id')
  async getDriver(@Param('id') id: string): Promise<Driver> {
    return this.driverService.getDriver(id);
  }

  @ApiOperation({ summary: 'Get pending orders for driver' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('orders/:id')
  async getPendingOrders(@Param('id') id: string): Promise<Order[]> {
    return this.driverService.getPendingOrders(id);
  }

  @ApiOperation({ summary: 'Change driver status' })
  @ApiResponse({ status: 201 })
  @Post('status-change')
  async changeStatus(@Body() statusChangeDto: StatusChangeDto): Promise<void> {
    return this.driverService.changeStatus(statusChangeDto);
  }

  @ApiOperation({ summary: 'Add driver balance for completed order' })
  @ApiResponse({ status: 201 })
  @Post('complete')
  async completeOrder(@Body() acceptOrderDto: AcceptOrderDto): Promise<void> {
    return this.driverService.completeOrder(acceptOrderDto);
  }

  @ApiOperation({ summary: 'Get driver balance' })
  @ApiResponse({ status: 200, type: Number })
  @Get('balance/:id')
  async getBalance(@Param('id') id: string): Promise<number> {
    return this.driverService.getBalance(id);
  }
}
