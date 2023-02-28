/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserVehicle } from './entities/user-vehicle.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User,UserVehicle,Request])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
