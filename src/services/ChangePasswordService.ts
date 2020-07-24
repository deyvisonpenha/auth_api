import { MongoRepository, getMongoRepository } from "typeorm";
import { compare, hash } from 'bcryptjs';
import mongojs from  'mongojs';
var ObjectId = mongojs.ObjectId;

import User from "../models/User";

class ChangePasswordService {
  private ormRepository: MongoRepository<User>

  constructor() {
    this.ormRepository = getMongoRepository(User);
  }

  public async execute({id, newpassword }){
    /*
    const user = await this.ormRepository.findOne({ where: {id}});
    const passwordMatched = await compare(oldpassword, user.password);

    if(!passwordMatched){
      throw new Error('Senha Atual Inválida');
    }
    */

    const hashedPassword = await hash(newpassword, 8);

    const response = await this.ormRepository.findOneAndUpdate(
      {_id: ObjectId(id)},
      { $set: {password: hashedPassword}},
      {returnOriginal: false },
    );
    return response.value;
  }
}

export default ChangePasswordService;
