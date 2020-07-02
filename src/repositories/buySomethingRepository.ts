import {Repository, getRepository, EntityRepository} from 'typeorm';
import BuySomething from '../models/buySomething';


interface Request{
  user_id: string
}

@EntityRepository(BuySomething)
class buySomethingRepository {
  private ormRepository: Repository<BuySomething>

  constructor(){
    this.ormRepository = getRepository(BuySomething);
  }

  public async findAllByUser({user_id}: Request): Promise<BuySomething[]>{
    const allBuySomething = await this.ormRepository.find({ where: {user_id}});

    return allBuySomething;
  }
}

export default buySomethingRepository;
