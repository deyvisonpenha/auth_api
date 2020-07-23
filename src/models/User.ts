import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity('users')
class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;

  @Column()
  whatsapp: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  age?:Date;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date

}

export default User;
