import { getRepository, getMongoRepository} from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';

interface Request {
  email: string,
  password: string,
  whatsapp: string
}

class CreateUserService {
  public async execute({ email, password, whatsapp }: Request): Promise<User>{
    const userRepository = getMongoRepository(User);

    const checkUserExists = await userRepository.findOne({ where: {email}});

    if( checkUserExists){
      throw new Error('Email já existe');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({ email, password: hashedPassword, whatsapp});

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
