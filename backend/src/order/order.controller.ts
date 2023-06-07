import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './order.entity';
import { AcceptOrderDto } from './dto/accept-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get order' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('one/:id')
  getOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrder(id);
  }

  @ApiOperation({ summary: 'Get active orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('active')
  getAllActiveOrders(): Promise<Order[]> {
    return this.orderService.getAllActiveOrders();
  }

  @ApiOperation({ summary: 'Get pending orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('pending')
  getAllPendingOrders(): Promise<Order[]> {
    return this.orderService.getAllPendingOrders();
  }

  @ApiOperation({ summary: 'Get completed orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get('completed')
  getAllCompletedOrders(): Promise<Order[]> {
    return this.orderService.getAllCompletedOrders();
  }

  @ApiOperation({ summary: 'Generate order' })
  @ApiResponse({ status: 201, type: Order })
  @Post('generate')
  generateOrder(): Promise<Order> {
    return this.orderService.generateOrders();
  }

  @ApiOperation({ summary: 'Accept order' })
  @ApiResponse({ status: 201 })
  @Post('accept-order')
  acceptOrder(@Body() acceptOrderDto: AcceptOrderDto): Promise<void> {
    console.log(acceptOrderDto);
    return this.orderService.acceptOrder(acceptOrderDto);
  }
}
