import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Coolmeal')
  .setDescription('API documentation')
  .setVersion('1.0.0')
  .build();
