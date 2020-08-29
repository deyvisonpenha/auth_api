import { MongoRepository } from 'typeorm';
import Sales from '../models/Sales';

export default async function execute(
    initDate: Date,
    endDate: Date,
    ormRepository: MongoRepository<Sales>
  ){

    //const convertInitDate = new Date(initDate);
    //var convertEndDate = new Date(endDate);
    //convertEndDate.setHours(23, 59, 59);

    const salesByDate = await ormRepository.find({
        where: {
                $and:[
                    { created_at : { $gte : initDate } },
                    { created_at : { $lte: endDate } }
                ]
            },
        order: { created_at: -1 }
        });

    return salesByDate;
  }
