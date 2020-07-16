import { EntityRepository, getMongoRepository, MongoRepository, DeleteWriteOpResultObject, ObjectID, DeleteResult } from 'typeorm';
import DeliveryAddress from '../models/DeliveryAddress';

interface FullRequest {
  address: string;
  cep: string;
  number: string;
  optionalDescription: string;
  typeOfAddress: string;
  descriptionTypeAddress?: string;
  user_id: string;
}

interface Request {
  user_id: string;
}

interface DeleteRequest {
  address_id: string;
}

@EntityRepository(DeliveryAddress)
class deliveryAddressRepository {
  private ormRepository: MongoRepository<DeliveryAddress>

  constructor() {
    this.ormRepository = getMongoRepository(DeliveryAddress);
  }

  public async allByUsers({ user_id }: Request): Promise<DeliveryAddress[]> {
    const allAddress = this.ormRepository.find({ where: { user_id } });
    return allAddress;
  }

  public async create({
    address,
    cep,
    number,
    optionalDescription,
    typeOfAddress,
    descriptionTypeAddress,
    user_id
  }: FullRequest): Promise<DeliveryAddress> {

    const deliveryAddress = this.ormRepository.create({
      address,
      cep,
      number,
      optionalDescription,
      typeOfAddress,
      descriptionTypeAddress,
      user_id
    });

    try {
      await this.ormRepository.save(deliveryAddress);
    } catch{
      throw new Error('cant create a address')
    }

    return deliveryAddress;
  }

  public async delete({ address_id}: DeleteRequest): Promise<DeleteResult> {
    const response = await this.ormRepository.delete({id: address_id});
    console.log(response);
    return response;
  }
}

export default deliveryAddressRepository;
