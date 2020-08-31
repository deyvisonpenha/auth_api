import { Router, request, response } from 'express';
import SalesRepository from '../repositories/salesRepository';
import { getCustomRepository, ObjectID } from 'typeorm';
import multer from 'multer';
import multerConfig from '../config/upload';
import { Writable } from 'typeorm/platform/PlatformTools';

const salesRouter = Router();

// seekSomething.use(ensureAuthenticated);

const upload = multer(multerConfig);

salesRouter.get('/', async (request, response) => {
  const salesRepository = getCustomRepository(SalesRepository);

  const allSales = await salesRepository.allSales();

  return response.json(allSales);
});

salesRouter.get('/financial/admin', async (request, response)=> {
  const salesRepository = getCustomRepository(SalesRepository);
  const salesWeek = await salesRepository.dashboardAdmin()
  return response.json(salesWeek);
});

salesRouter.get('/financial/shop/:shop_id', async (request, response)=> {
  const { shop_id } = request.params;
  const salesRepository = getCustomRepository(SalesRepository);
  const salesWeek = await salesRepository.dashboardShop(shop_id)
  return response.json(salesWeek);
});

salesRouter.get('/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const salesRepository = getCustomRepository(SalesRepository);

  const salesProduct = await salesRepository.allByUsers({ user_id });

  return response.json(salesProduct);
});

salesRouter.post('/filterbystatus', async (request, response) => {
  const { status } = request.body;
  const salesRepository = getCustomRepository(SalesRepository);

  const filterSalesByStatus = await salesRepository.filterByStatus(status);

  return response.json(filterSalesByStatus);

})

salesRouter.post('/filterbydate', async(request, response) => {
  const { initDate, endDate } = request.body;
  const salesRepository = getCustomRepository(SalesRepository);

  const filterSalesByDate = await salesRepository.filterByDate(initDate, endDate);

  return response.json(filterSalesByDate);
})

salesRouter.get('/shop/:shop_id', async (request, response) => {
  const { shop_id } = request.params;

  const salesRepository = getCustomRepository(SalesRepository);

  const allSalesByShop = await salesRepository.findByShop({ shop_id });

  return response.json(allSalesByShop);
})

salesRouter.post('/:user_id', async (request, response) => {
  const {
    shop_id,
    total,
    shop_amount,
    deliver_fee,
    paid,
    paid_type,
    //cancelled,
    //deliveried,
    status,
    observations,
    address_id,
    payment_type_id,
    //finished,
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
    paid_type,
    //cancelled,
    //deliveried,
    status,
    observations,
    address_id,
    payment_type_id,
    //finished,
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

salesRouter.patch('/:sales_id/status', async (request, response) => {
  const { sales_id: id } = request.params;
  const { status } = request.body;

  const salesRepository = getCustomRepository(SalesRepository);

  const updatedSalesStatus = await salesRepository.updateStateOfSales({ id, status })

  return response.json(updatedSalesStatus);
});

export default salesRouter;
//47A628B34A4878A6C84932DF03F18EEDF09902C828E95244C7
