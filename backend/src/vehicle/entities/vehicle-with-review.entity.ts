/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity'
import { UserVehicle } from 'src/user/entities/user-vehicle.entity'
import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Vehicle } from './vehicle.entity';

export class VehicleWithReview extends Vehicle {
  @ApiProperty({
    type: Number,
  })
    
  id: number;

  @ApiProperty({
    type: String,
  })
  registrationId: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  imagename: string;

  @ApiProperty({
    type: String,
  })
  province: string;

  @ApiProperty({
    type: Number,
  })
  maximumCapacity: number;
  @ApiProperty({
    type: Number,
  })
  reviewScore: number;

  user : User

  user_vehicle: UserVehicle[]

  comments : Comment[]

  rentingRequests: RentingRequest[];

}
