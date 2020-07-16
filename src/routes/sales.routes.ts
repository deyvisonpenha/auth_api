import { Router } from 'express';
import SalesRepository from '../repositories/salesRepository';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import multerConfig from '../config/upload';

const salesRouter = Router();

// seekSomething.use(ensureAuthenticated);

const upload = multer(multerConfig);

salesRouter.get('/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const salesRepository = getCustomRepository(SalesRepository);

  const salesProduct = await salesRepository.allByUsers({ user_id });

  return response.json(salesProduct);
});

salesRouter.post('/:user_id', async (request, response) => {
  const {
    shop_id,
    total,
    shop_amount,
    deliver_fee,
    paid,
    cancelled,
    deliveried,
    status,
    observations,
    address_id,
    payment_type_id,
    finished,
    delivery_tax,
    type_delivery,
    troco,
    cashback_value,
    products,
    documents,
    shop_name,
    cupom_id
  } = request.body;

  const { user_id } = request.params;

  //const product_image = request.file.path;

  const salesRepository = getCustomRepository(SalesRepository);

  const salesProduct = await salesRepository.create({
    shop_id,
    user_id,
    total,
    shop_amount,
    deliver_fee,
    paid,
    cancelled,
    deliveried,
    status,
    observations,
    address_id,
    payment_type_id,
    finished,
    delivery_tax,
    type_delivery,
    troco,
    cashback_value,
    products,
    documents,
    shop_name,
    cupom_id
  });

  return response.json({ salesProduct });
});

export default salesRouter;
