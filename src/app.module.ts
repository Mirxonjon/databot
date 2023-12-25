import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { connectDb } from './config/typeorm';
import { UsersModule } from './module/users/users.module';
import { AdminModule } from './module/admin/admin.module';
// import { CategoryInfoModule } from './module/categories_Info/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    UsersModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
