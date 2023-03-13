import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { RentingRequest } from './entities/renting-request.entity';
import { RentingRequestController } from './renting-request.controller';
import { RentingRequestService } from './renting-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentingRequest, User, Vehicle])],
  controllers: [RentingRequestController],
  providers: [RentingRequestService]
})
export class RentingRequestModule {}
