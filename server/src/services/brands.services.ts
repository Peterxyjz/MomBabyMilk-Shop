import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from './database.services'
import Brand from '~/model/schemas/Brand.schema'
config()

class BrandsService {
  async upload(brand: Brand) {


    const result = await databaseService.brands.insertOne(brand)
    return result
  }

  async getAll() {
    return await databaseService.brands.find({}).toArray()
  }
  // getById:
  async getById(id: string) {
    const filter = { _id: new ObjectId(id) }
    return await databaseService.brands.findOne(filter)
  }
  //update:
  async update(id: string, brand: Brand) {
    const filter = { _id: new ObjectId(id) }
    const update = { $set: brand }
    return await databaseService.brands.updateOne(filter, update)
  }
  //delete:
  async delete(id: string) {
    const filter = { _id: new ObjectId(id) }
    return await databaseService.brands.deleteOne(filter)
  }
}
const brandsService = new BrandsService()
export default brandsService
