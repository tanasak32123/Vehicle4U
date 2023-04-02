import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  senderFirstName: string;

  @Column()
  senderLastName: string;

  @Column()
  receiverFirstName: string;

  @Column()
  receiverLastName: string;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
