import { Router } from 'express';
import CreateBuySomethingService from '../services/CreateBuySomethingService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AddressRepository from '../repositories/addressRepository';
import { getCustomRepository } from 'typeorm';

const addressRouter = Router();

addressRouter.use(ensureAuthenticated);

addressRouter.get('/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const addressRepository = getCustomRepository(AddressRepository);

  const allAddress = await addressRepository.allByUsers({ user_id });

  return response.json(allAddress);
});

addressRouter.post('/:user_id', async (request, response) => {
  try {
    const {
      address,
      cep,
      number,
      optionalDescription,
      typeOfAddress,
      descriptionTypeAddress
    } = request.body;

    const { user_id } = request.params;

    const addressRepository = getCustomRepository(AddressRepository);

    const deliveryAddress = await addressRepository.create({
      address,
      cep,
      number,
      optionalDescription,
      typeOfAddress,
      descriptionTypeAddress,
      user_id
    });

    delete deliveryAddress.user_id;
    delete deliveryAddress.updated_at;
    delete deliveryAddress.created_at;

    return response.json(deliveryAddress)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

addressRouter.delete('/:address_id', async (request, response) => {
  const { address_id } = request.params;

  const addressRepository = getCustomRepository(AddressRepository);

  const addressDeletedStatus = await addressRepository.delete({ address_id });

  if (!addressDeletedStatus.affected) {
    return response.status(400).json({ message: 'Error to delete address' });
  }
  return response.json({ message: 'Endereço deletado com sucesso.' });
});

export default addressRouter;
