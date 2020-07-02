import { Router } from 'express';
import CreateBuySomethingService from '../services/CreateBuySomethingService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import BuySomethingRepository from '../repositories/buySomethingRepository';
import {getCustomRepository} from 'typeorm';

const buySomethingRouter = Router();

buySomethingRouter.use(ensureAuthenticated);

buySomethingRouter.get('/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const buySomethingRepository = getCustomRepository(BuySomethingRepository);

  const allBuySomethingByUser = await buySomethingRepository.findAllByUser({user_id});

  return response.json(allBuySomethingByUser);
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
