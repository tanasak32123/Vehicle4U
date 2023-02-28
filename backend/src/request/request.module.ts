import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVehicle } from 'src/user/entities/user-vehicle.entity';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserVehicle,Vehicle, Request])],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule {}
