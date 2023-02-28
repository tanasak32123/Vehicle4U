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
import { Request } from 'src/request/entities/request.entity';

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

  @OneToOne(()=>Request, (requests)=> requests.vehicle)
  request: Request;
}
