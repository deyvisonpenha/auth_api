import {Repository, getRepository, EntityRepository, DeleteResult} from 'typeorm';
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
  products: string,
  documents: string,
  product_image: string
}


@EntityRepository(Sales)
class salesRepository {
  private ormRepository: Repository<Sales>

  constructor(){
    this.ormRepository = getRepository(Sales);
  }

  public async allByUsers({user_id}): Promise<Sales[]>{
    const allSales = this.ormRepository.find({where: {user_id}});
    return allSales;
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
  product_image
  }: Request): Promise<Sales>{

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
      product_image
    });

    try{
      await this.ormRepository.save(sale);
    }catch{
      throw new Error('cant create sales')
    }
    return sale;
  }

}

export default salesRepository;
