import { Router } from 'express';
import CreateUserService from '../services/CreateUserService'

const userRouter = Router();

userRouter.get('/', async (request, response) => {

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
