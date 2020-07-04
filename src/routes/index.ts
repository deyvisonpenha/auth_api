import {Router} from 'express';
import userRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import buySomethingRouter from './buySomething.routes';
import addressRouter from './address.routes';
import seeksomething from './seekSomething.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/buysomething', buySomethingRouter);
routes.use('/address', addressRouter);
routes.use('/seeksomething', seeksomething);

export default routes;
