import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentingRequestController } from './renting-request.controller';
import { RentingRequestService } from './renting-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  controllers: [RentingRequestController],
  providers: [RentingRequestService]
})
export class RentingRequestModule {}
