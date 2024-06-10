import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from './database.services'
import WareHouse from '~/model/schemas/WareHouse.schema'
config()

class WareHouseSerices {
  async upload(id: string) {
    const wareHouse = new WareHouse({ product_id: id })
    return await databaseService.warehouse.insertOne(wareHouse)
  }
  async getAll() {
    return await databaseService.warehouse.find({}).toArray()
  }

  async getById(id: string) {
    const filter = { product_id: id }
    return await databaseService.warehouse.findOne(filter)
  }
}
const wareHouseService = new WareHouseSerices()
export default wareHouseService
