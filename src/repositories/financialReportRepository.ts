import {EntityRepository, MongoRepository, getMongoRepository} from 'typeorm';

import Sales from '../models/Sales';
import User from '../models/User';
import findByRangeDate from '../middlewares/findByRangeDate';
import mostFrequentlyProducts from '../middlewares/mostFrequentlyProduct'

interface weekProduct{
  id_product: string,
  product_name: string,
  quantidade: number
}

interface Balance {
  total: number;
}

@EntityRepository(Sales)
class financialReportRespository {
  private ormRepository: MongoRepository<Sales>
  private UserOrmRepository: MongoRepository<User>

  constructor() {
    this.ormRepository = getMongoRepository(Sales);
    this.UserOrmRepository = getMongoRepository(User);
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

    const productsWithOutDuplicationWeek = mostFrequentlyProducts(salesOnWeek);
    const productsWithOutDuplicationMonth = mostFrequentlyProducts(salesOnMonth);

    const [,countSalesByStatus] = await this.ormRepository.findAndCount({ where: {status: "Aguardando coleta"}});


    const [,countUserCreatedToday] = await this.UserOrmRepository.findAndCount({ where: {
      created_at : { $gte : today}
    }});

    return { report: {
        totalSalesMoneyOnWeek,
        totalSalesMoneyOnMonth,
        countSalesToday,
        countSalesByStatus,
        countUserCreatedToday,
        topProductWeek: productsWithOutDuplicationWeek,
        topProductMonth: productsWithOutDuplicationMonth,
    }}
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

    const productsWithOutDuplicationWeek = mostFrequentlyProducts(salesOnWeek);
    const productsWithOutDuplicationMonth = mostFrequentlyProducts(salesOnMonth);

    const [,countSalesByStatus] = await this.ormRepository.findAndCount({
      where: {
        status: "Aguardando coleta",
        shop_id: Number(shop_id)
      }
    });


    return { report: {
        totalSalesMoneyOnWeek,
        totalSalesMoneyOnMonth,
        countSalesToday,
        countSalesByStatus,
        topProductWeek: productsWithOutDuplicationWeek,
        topProductMonth: productsWithOutDuplicationMonth,
    }}
  }

}

export default financialReportRespository;
