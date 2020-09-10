import Sales from '../models/Sales';

interface weekOrMonthProduct{
  id_product: string,
  product_name: string,
  quantidade: number
}

export default function execute(
  salesInWeekOrMonth: Sales[]
){
  const productsInWeekOrMonth = [];

  salesInWeekOrMonth.map( (sales) =>
      sales.products.map( (product: weekOrMonthProduct) =>
        productsInWeekOrMonth.push({
          product_id: product.id_product ,
          product_name: product.product_name,
          product_quantity: product.quantidade
        })
      )
  );

  const uniqueProductId = [...new Set(productsInWeekOrMonth.map(product => product.product_name))];

  const productsWithOutDuplication = uniqueProductId.map( productName =>
      [productsInWeekOrMonth.filter(product =>
      product.product_name === productName).length, productName]
    ).sort();

  const initialIndex = productsWithOutDuplication.length-3;
  const endIndex = productsWithOutDuplication.length;

  return  productsWithOutDuplication.slice(initialIndex, endIndex)
}
