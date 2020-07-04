import { getRepository } from 'typeorm';
import SeekSomething from '../models/SeekSomething';
import User from '../models/User';

interface Request {
  address: string,
  description: string
  user_id: string,
}

class CreateSeekSomethingService {
  public async execute({address, description, user_id}: Request): Promise<SeekSomething>{

    const seekSomethingRepository = getRepository(SeekSomething);

    const seekSomething = seekSomethingRepository.create({address, description, user_id});

    await seekSomethingRepository.save(seekSomething);

    return seekSomething;
  }
}

export default CreateSeekSomethingService;
