import { getRepository, getConnection, getMongoRepository, MongoRepository} from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';

class UpdateUserService {
  private ormRepository: MongoRepository<User>

  constructor() {
    this.ormRepository = getMongoRepository(User);
  }

  public async execute(id, userParamsUpdate): Promise< User | undefined >{
    try{
      /*
      const response = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(userParamsUpdate)
      .where("id = :id", { id })
      .execute();

      console.log(response);

      const userRepository = getMongoRepository(User);

      const user = await userRepository.findOne({where: {id}});
      */
     var ObjectID = require('mongodb').ObjectID;
     const response = await this.ormRepository.findOneAndUpdate(
      {_id: ObjectID(id)},
      { $set: userParamsUpdate},
      {returnOriginal: false },
    );
    const updatedUser = response.value;

      delete updatedUser?.password

      return updatedUser;
    }catch{
      throw new Error('Error Update User')
    }
  }
}

export default UpdateUserService;
