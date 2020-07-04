import {Repository, getRepository, EntityRepository, DeleteResult} from 'typeorm';
import DeliveryAddress from '../models/DeliveryAddress';

interface FullRequest{
  address: string;
  description: string;
  user_id: string;
}

interface Request{
  user_id: string;
}

interface DeleteRequest{
  address_id: string;
}

@EntityRepository(DeliveryAddress)
class deliveryAddressRepository {
  private ormRepository: Repository<DeliveryAddress>

  constructor(){
    this.ormRepository = getRepository(DeliveryAddress);
  }

  public async allByUsers({user_id}: Request): Promise<DeliveryAddress[]>{
    const allAddress = this.ormRepository.find({where: {user_id}});
    return allAddress;
  }

  public async create({ address, description, user_id }: FullRequest): Promise<DeliveryAddress>{

    const deliveryAddress = this.ormRepository.create({ address, description, user_id });

    try{
      await this.ormRepository.save(deliveryAddress);
    }catch{
      throw new Error('cant create a address')
    }

    return deliveryAddress;
  }
  public async delete({address_id}:DeleteRequest): Promise<DeleteResult>{
    const response = this.ormRepository.delete(address_id);

    return response;
  }
}

export default deliveryAddressRepository;
