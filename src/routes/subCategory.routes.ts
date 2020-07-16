import {Router} from 'express';
import {getCustomRepository} from 'typeorm';
import SubCategoryRepository from '../repositories/subCategoryRepository';

const router = Router();

router.get('/:category_id', async (request, response) => {
    const subcategoryRepository = getCustomRepository(SubCategoryRepository);
    const {category_id} = request.params;
    const subcategories = await subcategoryRepository.listAllShopByCategory({category_id});

    return response.json(subcategories);
})
router.post('/', async (request, response)=> {
  const {
    name,
    category_id,
    shop_id,
    description
  } = request.body;

  const subcategoryRepository = getCustomRepository(SubCategoryRepository);
  const subcategory = await subcategoryRepository.create({
    name,
    category_id,
    shop_id,
    description
  });

  return response.json(subcategory);
})

export default router;
