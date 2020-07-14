import { getRepository, getMongoRepository} from 'typeorm';
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

class CreateBuySomethingService {
  public async execute({
    address_to_buy, product_description, image, total_value, distance, service_charge, user_id
  }: Request): Promise<BuySomething>{

    const buySomethingRepository = getMongoRepository(BuySomething);

    const buySomething = buySomethingRepository.create({
      address_to_buy, product_description, image, total_value, distance, service_charge, user_id
    });

    await buySomethingRepository.save(buySomething);

    return buySomething;
  }
}

export default CreateBuySomethingService;
