import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ObjectIdColumn,
  ObjectID
} from 'typeorm';

import User from '../models/User';

@Entity('delivery_address')
class DeliveryAddress {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  cep: string

  @Column()
  address: string

  @Column()
  number: string

  @Column()
  optionalDescription: string

  @Column()
  typeOfAddress: string

  @Column()
  descriptionTypeAddress: string

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: "id" })
  user_delivery_address: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date
}

export default DeliveryAddress;
