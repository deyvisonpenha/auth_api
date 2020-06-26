import User from '../models/User';
import {getRepository, Repository, EntityRepository} from 'typeorm';
import InterfaceUserRepository from './InterfaceUserRepository';

@EntityRepository(User)
class UserRepository {
  private ormRepositoryUser: Repository<User>;

  constructor(){
    this.ormRepositoryUser = getRepository(User);
  }

  public async all(): Promise<User[]>{
    const ads_pet = await this.ormRepositoryUser.find();
    return ads_pet;
  }

  public async create(
      {email, password }: InterfaceUserRepository): Promise<User>{

    const user = this.ormRepositoryUser.create({ email, password });

    await this.ormRepositoryUser.save(user);

    return user;
  }

}

export default UserRepository;
