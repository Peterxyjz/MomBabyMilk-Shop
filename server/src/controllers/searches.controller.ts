import { NextFunction, Request, Response } from 'express'
import { Collection } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import Product from '~/model/schemas/Product.schema'
import databaseService from '~/services/database.services'

export const getProductsController = async (req: Request, res: Response) => {
  const product_name = req.body.product_name
  console.log(product_name);
  
  const query = { product_name: { $regex: product_name, $options: 'i' } }
  const products = await databaseService.products.find(query).toArray()

  return res.status(200).json({
    result: products
  })
}
