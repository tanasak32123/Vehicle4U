/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum Request_status {
  //custom status
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  INUSE = 'in use',
  EXPIRE = 'expire'
}

@Entity()
export class RentingRequest {

/*renter_id, car_id,
start_rent-date, end_rent_date,
status(enum), rent_place*/
  @ApiProperty({
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
  })
  @Column()
  startdate : string ;
  
  @ApiProperty({
    type: String,
  })
  @Column()
  starttime : string ;

  @ApiProperty({
    type: String,
  })
  @Column()
  enddate : string ;

  @ApiProperty({
    type: String,
  })
  @Column()
  endtime : string ;

  @ApiProperty({
    enum :["pending","accepted","rejected","in use","expire"]
  })
  @Column()
  status : Request_status;

  @ApiProperty({
    type: String,
  })
  @Column()
  info: string;
  
  @ApiProperty({
    type: String,
  })
  @Column()
  rent_place: string;

  @ApiProperty({
    type: String,
  })
  @Column({length : 10})
  contact: string;

  @OneToOne(() => Comment, (comment) => comment.request,{cascade: true})
  @JoinColumn()
  comment: Comment;
  
  @DeleteDateColumn()
  deleted_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => User, (user) => user.rentingRequests,{cascade: true})
  user : User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.rentingRequests,{cascade: true})
  vehicle : Vehicle;
}