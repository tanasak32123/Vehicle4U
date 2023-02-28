/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'src/renting-request/entities/renting-request.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserVehicle } from './user-vehicle.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    type: Number,
})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
})
  @Column({unique : true})
  username: string;

  @ApiProperty({
    type: String,
})
  @Column()
  password: string;

  @ApiProperty({
    type: String,
})
  @Column()
  first_name: string;

  @ApiProperty({
    type: String,
})
  @Column()
  last_name: string;

  @ApiProperty({
    type: String,
})
  @Column({length : 10})
  tel: string;
  
  @ApiProperty({
    type: String,
})
  @Column({length : 13 , unique : true})
  citizen_id: string; 

  @ApiProperty({
    type: String,
})
  @Column({nullable : true})
  payment_channel: string; 

  @ApiProperty({
    type: String,
})
  @Column({nullable : true})
  driving_license_id: string;
  
  @ApiProperty({
    type: Boolean,
})
  @Column({default : false})
  is_renter: boolean;

  @ApiProperty({
    type: Boolean,
})
  @Column({default : false})
  is_provider: boolean; 

  @DeleteDateColumn()
  deleted_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @CreateDateColumn()
  created_at: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[]

  @OneToMany(() => UserVehicle, (user_vehicle) => user_vehicle.user)
  user_vehicle : UserVehicle[]

  @OneToMany(() => Request, (request)=>request.user)
  requests:Request[];
}
