import { Router, request, response } from 'express';
import FinantialRepository from '../repositories/financialReportRepository';
import { getCustomRepository, ObjectID } from 'typeorm';

const FinantialRouter = Router();

// seekSomething.use(ensureAuthenticated);

FinantialRouter.get('/admin', async (request, response)=> {
  const salesRepository = getCustomRepository(FinantialRepository);
  const salesWeek = await salesRepository.dashboardAdmin()
  return response.json(salesWeek);
});

FinantialRouter.get('/shop/:shop_id', async (request, response)=> {
  const { shop_id } = request.params;
  const salesRepository = getCustomRepository(FinantialRepository);
  const salesWeek = await salesRepository.dashboardShop(shop_id)
  return response.json(salesWeek);
});


export default FinantialRouter;
