import {
  EntityRepository,
  getMongoRepository,
  MongoRepository,
} from 'typeorm';

import mongojs from 'mongojs';
var ObjectId = mongojs.ObjectId;

import Sales from '../models/Sales';
import findByRangeDate from '../middlewares/findByRangeDate';

interface Request {
  shop_id: number,
  user_id: string,
  total: number,
  shop_amount: string,
  deliver_fee: string,
  paid: number,
  paid_type: string,
  status: string,
  observations: string,
  address_id: number,
  payment_type_id: number,
  delivery_tax: string,
  type_delivery: string,
  troco: string,
  cashback_value: string,
  products: Array<object>,
  documents: string,
  cupom_id: string,
  shop_name: string
}

interface Balance {
  total: number;
}

@EntityRepository(Sales)
class salesRepository {
  private ormRepository: MongoRepository<Sales>

  constructor() {
    this.ormRepository = getMongoRepository(Sales);
  }

  public async filterByStatus( status: string ) {
    const salesByStatus = await this.ormRepository.find({ where: {status}});
    return salesByStatus;
  }

  public async filterByDate(initDate: Date, endDate: Date){
    const convertInitDate = new Date(initDate);
    var convertEndDate = new Date(endDate);
    convertEndDate.setHours(23, 59, 59);

    const sales = await this.ormRepository.find({
        where: {
                $and:[
                    { created_at : { $gte : convertInitDate } },
                    { created_at : { $lte: convertEndDate } }
                ]
            },
        order: { created_at: -1 }
        });

    return sales;
  }

  public async allSales(): Promise<Sales[]> {
    const allSales = await this.ormRepository.find({ order: { created_at: -1 } });

    return allSales;
  }

  public async dashboardAdmin() {
    const today = new Date();
    const lastDay = today.getDay();
    const currentMonth = today.getMonth();

    var beginigOfWeek = new Date();
    beginigOfWeek.setDate(beginigOfWeek.getDate() - lastDay);
    beginigOfWeek.setHours(0, 0, 0);

    var beginingOfMonth = new Date();
    beginingOfMonth.setMonth(currentMonth, 1)
    beginingOfMonth.setHours(0, 0, 0);

    const salesOnWeek = await findByRangeDate(beginigOfWeek, today, this.ormRepository);

  // fazer uma função para o reduce
    const totalSalesMoneyOnWeek = salesOnWeek.reduce(
        (accumulator: Balance, salesObject: Sales) => {
            accumulator.total += salesObject.total;
            accumulator.total = Number(accumulator.total.toFixed(2))

            return accumulator;
    }, {
      total: 0
    });

    const salesOnMonth = await findByRangeDate(beginingOfMonth, today, this.ormRepository);

    const totalSalesMoneyOnMonth = salesOnMonth.reduce(
        (accumulator: Balance, salesObject: Sales) => {
            accumulator.total += salesObject.total;
            accumulator.total = Number(accumulator.total.toFixed(2))

            return accumulator;
    }, {
      total: 0
    });

    today.setHours(0,0,0)
    const [,countSalesToday] = await this.ormRepository.findAndCount({where: { created_at : { $gte : today }}});
    console.log(countSalesToday)

    return { report: {
        totalSalesMoneyOnWeek,
        totalSalesMoneyOnMonth,
        countSalesToday
    }}
    //return totalSalesMoney;
  }

  public async dashboardShop(shop_id: string) {
    const today = new Date();
    const lastDay = today.getDay();
    const currentMonth = today.getMonth();

    var beginigOfWeek = new Date();
    beginigOfWeek.setDate(beginigOfWeek.getDate() - lastDay);
    beginigOfWeek.setHours(0, 0, 0);

    var beginingOfMonth = new Date();
    beginingOfMonth.setMonth(currentMonth, 1)
    beginingOfMonth.setHours(0, 0, 0);

    //const salesOnWeek = await (await findByRangeDate(beginigOfWeek, today, this.ormRepository));
    const salesOnWeek = await this.ormRepository.find({
        where: {
                $and:[
                    { created_at : { $gte : beginigOfWeek } },
                    { created_at : { $lte: today } },
                    { shop_id: Number(shop_id) }
                ]
            },
        order: { created_at: -1 }
        });

  // fazer uma função para o reduce
    const totalSalesMoneyOnWeek = salesOnWeek.reduce(
        (accumulator: Balance, salesObject: Sales) => {
            accumulator.total += salesObject.total;
            accumulator.total = Number(accumulator.total.toFixed(2))

            return accumulator;
    }, {
      total: 0
    });

    //const salesOnMonth = await findByRangeDate(beginingOfMonth, today, this.ormRepository);
    const salesOnMonth = await this.ormRepository.find({
        where: {
                $and:[
                    { created_at : { $gte : beginingOfMonth } },
                    { created_at : { $lte: today } },
                    { shop_id: Number(shop_id) }
                ]
            },
        order: { created_at: -1 }
        });

    const totalSalesMoneyOnMonth = salesOnMonth.reduce(
        (accumulator: Balance, salesObject: Sales) => {
            accumulator.total += salesObject.total;
            accumulator.total = Number(accumulator.total.toFixed(2))

            return accumulator;
    }, {
      total: 0
    });

    today.setHours(0,0,0);

    const [,countSalesToday] = await this.ormRepository.findAndCount({
      where: {
        created_at : { $gte : today },
        shop_id: Number(shop_id)
      }
      });

    return { report: {
        totalSalesMoneyOnWeek,
        totalSalesMoneyOnMonth,
        countSalesToday
    }}
    //return totalSalesMoney;
  }

  public async allByUsers({ user_id }): Promise<Sales[]> {
    const allSales = await this.ormRepository.find({ where: { user_id } });

    return allSales;
  }

  public async findByShop({ shop_id }): Promise<Sales[]> {
    shop_id = Number(shop_id);
    const sales = await this.ormRepository.find({ where: { shop_id } });
    return sales;
  }

  public async create({
    shop_id,
    user_id,
    total,
    shop_amount,
    deliver_fee,
    paid,
    paid_type,
    status,
    observations,
    address_id,
    payment_type_id,
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
      paid_type,
      status,
      observations,
      address_id,
      payment_type_id,
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

  public async updateStateOfSales({ id, status }) {
    const response = await this.ormRepository.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { status } },
      { returnOriginal: false },
    );

    return response.value;
  }

}

export default salesRepository;
