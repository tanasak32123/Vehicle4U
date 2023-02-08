/* eslint-disable prettier/prettier */
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
  @PrimaryGeneratedColumn()
  id: number;
  @Column({unique : true})
  username: string;
  @Column()
  password: string;
  @Column()
  first_name: string ;
  @Column()
  last_name: string ;
  @Column({length : 9})
  tel: string ;
  @Column({length : 13 , unique : true})
  citizen_id: string; 
  @Column({nullable : true})
  payment_channel: string; 
  @Column({nullable : true})
  driving_license_id : string ;
  @Column({default : false})
  is_renter: boolean;
  @Column({default : false})
  is_provider: boolean; 

  @DeleteDateColumn()
  deleted_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @CreateDateColumn()
  created_at: string;
}
