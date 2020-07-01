import { Router } from 'express';
import CreateBuySomethingService from '../services/CreateBuySomethingService';

const buySomethingRouter = Router();

buySomethingRouter.get('/:user_id', async (request, response) => {
  const { user_id } = request.params;
  const createBuySomethingService = new CreateBuySomethingService();

  const buySomething = await createBuySomethingService.allBuy({user_id});

  return response.json(buySomething);
});

buySomethingRouter.post('/:user_id', async (request, response) => {
  try{
    const {
      address_to_buy, product_description, image, total_value, distance, service_charge
    } = request.body;
    const { user_id } = request.params;

    const createBuySomethingService = new CreateBuySomethingService();

    const buySomething = await createBuySomethingService.execute({
      address_to_buy, product_description,
      image, total_value, distance, service_charge, user_id});

    return response.json(buySomething)
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

export default buySomethingRouter;
