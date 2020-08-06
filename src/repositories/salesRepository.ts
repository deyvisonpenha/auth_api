import {
  Repository,
  getRepository,
  EntityRepository,
  DeleteResult,
  getMongoRepository,
  MongoRepository
} from 'typeorm';

import mongojs from  'mongojs';
var ObjectId = mongojs.ObjectId;


import Sales from '../models/Sales';

interface Request {
  shop_id: number,
  user_id: string,
  total: string,
  shop_amount: string,
  deliver_fee: string,
  paid: number,
  cancelled: number,
  deliveried: number,
  status: string,
  observations: string,
  address_id: number,
  payment_type_id: number,
  finished: number,
  delivery_tax: string,
  type_delivery: string,
  troco: string,
  cashback_value: string,
  products: Array<object>,
  documents: string,
  cupom_id: string,
  shop_name
}

@EntityRepository(Sales)
class salesRepository {
  private ormRepository: MongoRepository<Sales>

  constructor() {
    this.ormRepository = getMongoRepository(Sales);
  }

  public async allSales(): Promise<Sales[]> {
    const allSales = await this.ormRepository.find({ order: {created_at: -1} });

    return allSales;
  }

  public async allByUsers({ user_id }): Promise<Sales[]> {
    const allSales = await this.ormRepository.find({ where: { user_id } });

    return allSales;
  }

  public async findByShop({shop_id}): Promise<Sales[]>{
    shop_id = Number(shop_id);
    const sales = await this.ormRepository.find({where: {shop_id} });
    return sales;
  }

  public async create({
    shop_id,
    user_id,
    total,
    shop_amount,
    deliver_fee,
    paid,
    cancelled,
    deliveried,
    status,
    observations,
    address_id,
    payment_type_id,
    finished,
    delivery_tax,
    type_delivery,
    troco,
    cashback_value,
    products,
    documents,
    cupom_id,
    shop_name
  }: Request): Promise<Sales> {

    const sale = this.ormRepository.create({
      shop_id,
      user_id,
      total,
      shop_amount,
      deliver_fee,
      paid,
      cancelled,
      deliveried,
      status,
      observations,
      address_id,
      payment_type_id,
      finished,
      delivery_tax,
      type_delivery,
      troco,
      cashback_value,
      products,
      documents,
      shop_name,
      cupom_id
    });

    try {
      await this.ormRepository.save(sale);
    } catch{
      throw new Error('cant create sales')
    }
    return sale;
  }

  public async updateStateOfSales({id, status}){
    const response = await this.ormRepository.findOneAndUpdate(
      {_id: ObjectId(id)},
      { $set: {status}},
      {returnOriginal: false },
    );

    return response.value;
  }

}

export default salesRepository;
