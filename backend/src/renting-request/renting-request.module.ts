import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { RentingRequestController } from './renting-request.controller';
import { RentingRequestService } from './renting-request.service';

@Module({
  imports: [
    UserModule,
    VehicleModule,
    TypeOrmModule.forFeature([Request])],
  controllers: [RentingRequestController],
  providers: [RentingRequestService]
})
export class RentingRequestModule {}
