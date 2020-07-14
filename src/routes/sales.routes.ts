import { Router } from 'express';
import SalesRepository from '../repositories/salesRepository';
import {getCustomRepository} from 'typeorm';

const salesRouter = Router();

// seekSomething.use(ensureAuthenticated);

salesRouter.get('/:user_id', async (request, response) => {
  const {user_id} = request.params;

  const salesRepository = getCustomRepository(SalesRepository);

  const salesProduct = await salesRepository.allByUsers({user_id});

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
  product_image
  } = request.body;

  const {user_id} = request.params;

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
    product_image
  });

  return response.json({salesProduct});
});

export default salesRouter;
