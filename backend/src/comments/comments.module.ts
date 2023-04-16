import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
<<<<<<< HEAD
import { Comment } from './entities/comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RentingRequest, User, Vehicle, Comment])],
=======
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentingRequest, User, Vehicle,Comment])],
>>>>>>> 5935a6c3e100193f4e20e2e99644afbe164fe6ad
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
