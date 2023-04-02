import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, RentingRequest, User])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
