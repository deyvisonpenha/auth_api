import { getRepository, getConnection, getMongoRepository, MongoRepository } from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';

class UpdateUserService {
  private ormRepository: MongoRepository<User>

  constructor() {
    this.ormRepository = getMongoRepository(User);
  }

  public async execute(id, userParamsUpdate): Promise<User | undefined> {
    try {
      var ObjectID = require('mongodb').ObjectID;

      if (userParamsUpdate.password) {
        delete userParamsUpdate.password;
      }

      const response = await this.ormRepository.findOneAndUpdate(
        { _id: ObjectID(id) },
        { $set: userParamsUpdate },
        { returnOriginal: false },
      );

      const updatedUser = response.value;

      delete updatedUser?.password

      return updatedUser;
    } catch{
      throw new Error('Error Update User')
    }
  }
}

export default UpdateUserService;
