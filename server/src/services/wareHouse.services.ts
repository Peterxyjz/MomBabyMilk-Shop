import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from './database.services'
import WareHouse from '~/model/schemas/WareHouse.schema'
import { ErrorWithStatus } from '~/model/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
config()

class WareHouseSerices {
  async upload(id: string) {
    const wareHouse = new WareHouse({ _id: new ObjectId(id) })
    return await databaseService.warehouse.insertOne(wareHouse)
  }
  async getAll() {
    return await databaseService.warehouse.find({}).toArray()
  }

  async getById(id: string) {
    const filter = { _id: new ObjectId(id) }
    return await databaseService.warehouse.findOne(filter)
  }
  async decreaseAmount(item: any) {
    const productAmount = (await databaseService.warehouse.findOne({
      _id: new ObjectId(item.product_id)
    })) as WareHouse
    const stock = Number(productAmount.amount) - item.amount
    if (stock < 0) {
      throw new ErrorWithStatus({
        message: 'Sản phẩm không đủ',
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY
      })
    }
    return await databaseService.warehouse.updateOne(
      { _id: new ObjectId(item.product_id) },
      { $set: { amount: stock } }
    )
  }

  async increaseAmount(item: any) {
    const productAmount = (await databaseService.warehouse.findOne({
      _id: new ObjectId(item.product_id)
    })) as WareHouse
    const stock = Number(productAmount.amount) + item.amount
    return await databaseService.warehouse.updateOne(
      { _id: new ObjectId(item.product_id) },
      { $set: { amount: stock } }
    )
  }
}
const wareHouseService = new WareHouseSerices()
export default wareHouseService
