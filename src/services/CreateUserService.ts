import { getRepository, getMongoRepository} from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';

interface Request {
  email: string,
  password: string,
  whatsapp: string,
  name: string,
  age: Date,
}

class CreateUserService {
  public async execute({ email, password, whatsapp, name, age }: Request): Promise<User>{
    const userRepository = getMongoRepository(User);

    const checkUserExists = await userRepository.findOne({ where: {email}});

    if( checkUserExists){
      throw new Error('Email já existe');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({ email, password: hashedPassword, whatsapp, name, age});

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
