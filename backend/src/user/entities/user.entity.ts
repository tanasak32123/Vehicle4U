/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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
}
