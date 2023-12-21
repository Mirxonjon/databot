import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Hr-dashboard project')
  .setVersion('2.0')
  .build();
