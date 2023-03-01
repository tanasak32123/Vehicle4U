import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserVehicle, Request, Vehicle])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
