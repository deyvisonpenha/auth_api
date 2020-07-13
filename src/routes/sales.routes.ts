import { Router } from 'express';
import CreateSalesService from '../services/CreateSalesService';

const seekSomething = Router();

// seekSomething.use(ensureAuthenticated);

seekSomething.get('/sales', async (request, response) => {

});

seekSomething.post('/:user_id', async (request, response) => {
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

  const createSalesService = new CreateSalesService();

  const salesProduct = await createSalesService.execute({
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

  response.json({salesProduct});
});

export default seekSomething;
