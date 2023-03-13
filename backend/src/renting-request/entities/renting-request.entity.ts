/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
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
} from 'typeorm';

export enum Request_status {
  //custom status
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
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
    type: Number,
  })
  @Column()
  renter_id : number;

  @ApiProperty({
    type: Number,
  })
  @Column()
  car_id : number;

  @ApiProperty({
    type: String,
  })
  @Column({ type: 'date' })
  startdate : string ;
  
  @ApiProperty({
    type: String,
  })
  @Column({ type: 'time' })
  starttime : string ;

  @ApiProperty({
    type: String,
  })
  @Column({ type: 'date' })
  enddate : string ;

  @ApiProperty({
    type: String,
  })
  @Column({ type: 'time' })
  endtime : string ;

  @ApiProperty({
    enum:['pending','accepted','rejected'],
  })
  @Column({ type: 'enum', enum:Request_status})
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
  
  @DeleteDateColumn()
  deleted_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => User, (user) => user.rentingRequests)
  user : User;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.rentingRequest)
  vehicle : Vehicle;
}