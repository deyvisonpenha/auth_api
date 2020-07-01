import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,} from 'typeorm';

import User from '../models/User';

@Entity('buySomething')
class BuySomething {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  addressToBuy : string;

  @Column()
  productDescription : string;

  @Column()
  image: string;

  @Column()
  TotalValue: string[];

  @Column()
  distance: string;

  @Column()
  serviceCharge: string;

  @OneToMany( type => User, user => user.id)
  @JoinColumn({name: 'user_id',  referencedColumnName: "id"})
  user_id: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date

}

export default BuySomething;
