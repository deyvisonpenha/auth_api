import {Entity, ObjectIdColumn, ObjectID, Column} from 'typeorm';

@Entity('subCategories')
class SubCategory {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  category_id: string;

  @Column()
  shop_id: string;

  @Column()
  description: string;

}

export default SubCategory;
