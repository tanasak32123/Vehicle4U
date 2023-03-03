/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity'
import { UserVehicle } from 'src/user/entities/user-vehicle.entity'
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @ApiProperty({
    type: Number,
})
  @PrimaryGeneratedColumn()
  id: number;

  @DeleteDateColumn()
  deleted_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => User, (user) => user.vehicles)
  user : User

  @OneToMany(() => UserVehicle, (user_vehicle) => user_vehicle.vehicle)
  user_vehicle : UserVehicle[]

  @OneToOne(()=>RentingRequest, (rentingRequest)=> rentingRequest.vehicle)
  rentingRequest: RentingRequest;

}
