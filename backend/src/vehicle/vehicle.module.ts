import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, RentingRequest])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
