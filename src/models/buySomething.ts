import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    } from 'typeorm';

import User from '../models/User';

@Entity('buysomething')
class BuySomething {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address_to_buy : string;

  @Column()
  product_description : string;

  @Column()
  image: string;

  @Column({array: true})
  total_value: string;

  @Column('decimal')
  distance: number;

  @Column('decimal')
  service_charge: number;

  @Column()
  user_id: string;

  @ManyToOne( () => User)
  @JoinColumn({name: 'user_id',  referencedColumnName: "id"})
  user_buy_something: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date

}

export default BuySomething;
