import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutDriverDto {
  @ApiProperty({
    example: 'b20649d2-9853-4add-a968-4f144064340b',
    description: 'Driver id',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
