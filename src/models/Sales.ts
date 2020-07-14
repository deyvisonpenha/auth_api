import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID
} from 'typeorm';

import User from '../models/User';

@Entity('sales_product')
class Sales {
  @ObjectIdColumn()
  id: ObjectID

  @Column('decimal')
  shop_id: number;

  @Column()
  user_id: string;

  @Column()
  total: string;

  @Column()
  shop_amount: string;

  @Column()
  deliver_fee: string;

  @Column('decimal')
  paid: number;

  @Column('decimal')
  cancelled: number;

  @Column('decimal')
  deliveried: number;

  @Column()
  status: string;

  @Column()
  observations: string;

  @Column('decimal')
  address_id: number;

  @Column('decimal')
  payment_type_id: number;

  @Column('decimal')
  finished: number;

  @Column()
  delivery_tax: string;

  @Column()
  type_delivery: string;

  @Column()
  troco: string;

  @Column()
  cashback_value: string;

  @Column()
  products: Array<object>;

  @Column()
  documents: string;

  @Column()
  product_image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date
}

export default Sales;
