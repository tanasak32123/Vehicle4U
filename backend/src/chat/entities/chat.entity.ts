import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum Sender {
  RENTER = 'renter',
  PROVIDER = 'provider',
}

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.senders)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivers)
  receiver: User;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
