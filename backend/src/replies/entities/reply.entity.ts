import { RentingRequest } from 'src/renting-request/entities/renting-request.entity';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => Comment, (comment) => comment.reply)
  comment: Comment;

  @ManyToOne(() => User, (user) => user.replies)
  user: User
    
  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}