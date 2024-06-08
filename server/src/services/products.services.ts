import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from './database.services'
import Product from '~/model/schemas/Product.schema'
config()

class ProductsService {
  async upload(product: Product) {
    product._id = new ObjectId()
    const result = await databaseService.products.insertOne(
      new Product({
        _id: product._id,
        isActive: true,
        ...product
      })
    )
    return result
  }

  // getAllList:
  async getAll() {
    return await databaseService.products.find({}).toArray()
  }
  // getById:
  async getById(id: string) {
    const filter = { _id: new ObjectId(id) }
    return await databaseService.products.findOne(filter)
  }
  //update:
  async update(id: string, product: Product) {
    const filter = { _id: new ObjectId(id) }
    const update = { $set: product }
    return await databaseService.products.updateOne(filter, update)
  }
  //notActive:
  async notActive(id: string) {
    const filter = { _id: new ObjectId(id) }
    const update = { $set: { isActive: false } }
    return await databaseService.products.updateOne(filter, update)
  }
  async updateUrl(id: string, imgUrl: string) {
    const filter = { _id: new ObjectId(id) }
    const update = {
      $set: {
        imgUrl
      }
    }
    return await databaseService.products.updateOne(filter, update)
  }
}
const productsService = new ProductsService()
export default productsService
