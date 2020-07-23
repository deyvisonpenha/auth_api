import { getRepository, getConnection, getMongoRepository, MongoRepository} from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';

import mongojs from  'mongojs';
var ObjectId = mongojs.ObjectId;

interface Request {
 id: string,
 userParamsUpdate: {
   email: string,
   whatsapp: string
  }
}

class UpdateUserService {
  private ormRepository: MongoRepository<User>

  constructor() {
    this.ormRepository = getMongoRepository(User);
  }

  public async execute({id, userParamsUpdate}: Request): Promise< User | undefined >{
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
     const response = await this.ormRepository.findOneAndUpdate(
      {_id: ObjectId(id)},
      { $set: {userParamsUpdate}},
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
