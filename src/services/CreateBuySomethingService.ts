import { getRepository } from 'typeorm';
import BuySomething from '../models/buySomething';
import User from '../models/User';

interface Request {
  address_to_buy: string,
  product_description: string,
  image: string,
  total_value: string,
  distance: number,
  service_charge: number,
  user_id: string,
}

interface All{
  user_id: string
}

class CreateBuySomethingService {
  public async execute({
    address_to_buy, product_description, image, total_value, distance, service_charge, user_id
  }: Request): Promise<BuySomething>{

    const buySomethingRepository = getRepository(BuySomething);

    const buySomething = buySomethingRepository.create({
      address_to_buy, product_description, image, total_value, distance, service_charge, user_id
    });

    await buySomethingRepository.save(buySomething);

    return buySomething;
  }

  public async allBuy({user_id}: All): Promise<BuySomething[]>{
    const buySomethingRepository = getRepository(BuySomething);

    const allBuySomething = await buySomethingRepository.find({ where: {user_id}});

    return allBuySomething;
  }
}

export default CreateBuySomethingService;
