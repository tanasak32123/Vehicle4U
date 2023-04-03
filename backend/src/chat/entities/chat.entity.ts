import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum Sender {
  RENTER = 'renter',
  PROVIDER = 'provider'
}


@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  renterFirstName: string;

  @Column()
  renterLastName: string;

  @Column()
  providerFirstName: string;

  @Column()
  providerLastName: string;

  @Column()
  message: string;

  @Column()
  sender: string;

  // @Column({
  //   type: 'enum',
  //   enum: Sender,
  //   default: Sender.RENTER
  // })
  // sender: Sender


  @CreateDateColumn()
  createdAt: Date;
}
