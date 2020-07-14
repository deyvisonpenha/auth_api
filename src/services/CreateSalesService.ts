import { getRepository } from 'typeorm';
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
  product_image: string
}

class CreateSalesService {
  public async execute({
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

    const salesRepository = getRepository(Sales);

    const sale = salesRepository.create({
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

  await salesRepository.save(sale);

  return sale;

  }
}

export default CreateSalesService;
