/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserVehicle {
  @ApiProperty({
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
  })
  @Column({ type: 'date' })
  rent_date : string ; 

  @ApiProperty({
    type: String,
  })
  @Column({ type: 'date' })
  return_date : string ; 
  
  @DeleteDateColumn()
  deleted_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => User, (user) => user.user_vehicle)
  user : User

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.user_vehicle)
  vehicle : Vehicle
}
