import { Module } from '@nestjs/common';
import { adminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [adminController],
  providers: [AdminService],
})
export class AdminModule {}
