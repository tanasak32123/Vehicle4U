import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';
import { Reply } from 'src/replies/entities/reply.entity';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => RentingRequest, (req) => req.comment)
  request: RentingRequest;
    
  @OneToOne(() => Reply, (rep) => rep.comment)
  reply: Reply;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.comments)
  vehicle: Vehicle;

  @Column()
  message: string;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;
}
