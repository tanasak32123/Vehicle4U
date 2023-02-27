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
  Column,
} from 'typeorm';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @ApiProperty({
    type: Number,
})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  province: string;

  @ApiProperty({
    type: Number,
  })
  @Column()
  maximumCapacity: number;

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
}
