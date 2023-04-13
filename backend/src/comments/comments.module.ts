import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Reply } from 'src/replies/entities/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentingRequest, User, Vehicle,Reply])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
