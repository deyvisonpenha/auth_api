import { getRepository, getConnection} from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';

interface Request {
 id: string,
 userParamsUpdate: {
   email: string,
   whatsapp: string
  }
}

class UpdateUserService {
  public async execute({id, userParamsUpdate}: Request): Promise< User | undefined >{
    try{
      const response = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(userParamsUpdate)
      .where("id = :id", { id })
      .execute();

      console.log(response);

      const userRepository = getRepository(User);

      const user = await userRepository.findOne({where: {id}});

      delete user?.password

      return user;
    }catch{
      throw new Error('Error Update User')
    }
  }
}

export default UpdateUserService;
