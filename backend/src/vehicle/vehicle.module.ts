import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from 'src/request/entities/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Request])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
