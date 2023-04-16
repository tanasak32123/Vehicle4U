import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => RentingRequest, (req) => req.comment)
  @JoinColumn()
  request: RentingRequest;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.comments)
  vehicle: Vehicle;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  message: string;

  @Column()
  score: number;

  @Column({ nullable: true })
  reply: string;

  @CreateDateColumn()
  createdAt: Date;
}
