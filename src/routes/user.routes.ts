import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

// teste inicio
import {getRepository} from 'typeorm';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// teste fim
const userRouter = Router();

userRouter.get('/', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return response.json(users);
});

userRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  //const {email, password, whatsapp} = request.body;
  const userParamsUpdate = request.body;

  const updateUser = new UpdateUserService();

  const user = await updateUser.execute({ id, userParamsUpdate});

  return response.json(user);
});

userRouter.post('/', async (request, response) => {
  try{
    const { email, password, whatsapp } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({email, password, whatsapp});

    delete user.password;

    return response.json(user)
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

export default userRouter;
