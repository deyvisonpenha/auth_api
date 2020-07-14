import {Repository, getRepository, EntityRepository, getMongoRepository, MongoRepository} from 'typeorm';
import BuySomething from '../models/buySomething';


interface Request{
  user_id: string
}

@EntityRepository(BuySomething)
class buySomethingRepository {
  private ormRepository: MongoRepository<BuySomething>

  constructor(){
    this.ormRepository = getMongoRepository(BuySomething);
  }

  public async findAllByUser({user_id}: Request): Promise<BuySomething[]>{
    const allBuySomething = await this.ormRepository.find({ where: {user_id}});

    return allBuySomething;
  }
}

export default buySomethingRepository;
