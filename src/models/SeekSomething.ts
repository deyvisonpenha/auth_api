import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import User from '../models/User';

@Entity('seek_something')
class SeekSomething {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  address: string;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @ManyToOne( () => User)
  @JoinColumn({name: 'user_id',  referencedColumnName: "id"})
  user_delivery_address: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date
}

export default SeekSomething;
