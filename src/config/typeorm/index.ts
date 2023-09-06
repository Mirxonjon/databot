import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {  UsersEntity } from 'src/entities/users.entity';
import { AdminEntity } from 'src/entities/admin.entity';

dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [
UsersEntity ,
AdminEntity
  ],
  autoLoadEntities: true,
  synchronize: true,
};
