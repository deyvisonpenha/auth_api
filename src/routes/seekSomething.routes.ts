import { Router } from 'express';
import CreateSeekSomethingService from '../services/CreateSeekSomethingService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const seekSomething = Router();

// seekSomething.use(ensureAuthenticated);

seekSomething.get('/:user_id', async (request, response) => {

});

seekSomething.post('/:user_id', async (request, response) => {
  const {address, description} = request.body;
  const {user_id} = request.params;

  const createSeekSomethingService = new CreateSeekSomethingService();

  const seekSomething = await createSeekSomethingService.execute({address, description, user_id});

  response.json({seekSomething});
});

export default seekSomething;
