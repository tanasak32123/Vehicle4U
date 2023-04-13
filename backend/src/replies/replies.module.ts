import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Reply } from './entities/reply.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentingRequest, User, Vehicle,Comment])],
  controllers: [RepliesController],
  providers: [RepliesService]
})
export class RepliesModule {}
