import {Router} from 'express';
import userRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import buySomethingRouter from './buySomething.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/buysomething', buySomethingRouter);

export default routes;
