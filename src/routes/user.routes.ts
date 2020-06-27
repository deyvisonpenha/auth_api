import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

// teste inicio
import {getRepository} from 'typeorm';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// teste fim
const userRouter = Router();

userRouter.get('/', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  console.log(users);
  return response.json(users);
});

userRouter.post('/', async (request, response) => {
  try{
    const { email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({email, password});

    delete user.password;

    return response.json(user)
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

export default userRouter;
