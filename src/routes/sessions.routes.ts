import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try{
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({ email, password });

    return response.json({ user, token })
  }catch(err){
    return response.status(400).json({error: err.message});
  }
});

export default userRouter;
