import {Router} from 'express';
import userRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import buySomethingRouter from './buySomething.routes';
import addressRouter from './address.routes';
import seeksomething from './seekSomething.routes';
import salesRouter from  './sales.routes';
import subcategoryRouter from './subCategory.routes';
import financialSalesRouter from './financialSales.routes'

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/buysomething', buySomethingRouter);
routes.use('/address', addressRouter);
routes.use('/seeksomething', seeksomething);
routes.use('/sales',salesRouter);
routes.use('/subcategory', subcategoryRouter);
routes.use('/financial', financialSalesRouter);

export default routes;
