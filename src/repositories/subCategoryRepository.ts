import {MongoRepository, getMongoRepository, EntityRepository} from 'typeorm'
import SubCategory from '../models/SubCategory';

interface CreateSubCategoryRequest {
  name: string,
  category_id: string,
  shop_id: string,
  description: string
}
@EntityRepository(SubCategory)
class subCategoryRepository {
  private ormRepository: MongoRepository<SubCategory>;

  constructor(){
    this.ormRepository = getMongoRepository(SubCategory);
  }

  public listAllShopByCategory({category_id}): Promise<SubCategory[]>{
    const shopBySubCategory = this.ormRepository.find({where: { category_id }})
    return shopBySubCategory;
  }

  public async create({
    name,
    category_id,
    shop_id,
    description
  }: CreateSubCategoryRequest): Promise<SubCategory>{

    const subcategory = this.ormRepository.create({
    name,
    category_id,
    shop_id,
    description
  });

  await this.ormRepository.save(subcategory);

  return subcategory;
  }

}

export default subCategoryRepository;
