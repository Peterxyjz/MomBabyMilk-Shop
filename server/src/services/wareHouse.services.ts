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
  async decreaseAmount(id: string, amount: number) {
    const [amount_available, warehouse] = await Promise.all([this.getAmoutAvailableById(id), this.getById(id)])
    console.log(amount_available, id, amount)

    if (amount_available < amount || warehouse === null || warehouse.shipments === undefined) {
      throw new ErrorWithStatus({ message: 'Số lượng sản phẩm trong kho không đủ', status: HTTP_STATUS.BAD_REQUEST })
    }
    const list_id = []
    const currentDate = new Date()
    for (const item of warehouse.shipments) {
      if (
        amount > 0 &&
        item.amount_selled !== undefined &&
        item.expired_at > currentDate &&
        item.amount_selled + amount > item.amount
      ) {
        list_id.push({ id: item.input_bill_id, amount: item.amount - item.amount_selled })
        amount = amount + item.amount_selled - item.amount
        item.amount_selled = item.amount
      } else if (
        amount > 0 &&
        item.amount_selled !== undefined &&
        item.expired_at > currentDate &&
        item.amount_selled + amount <= item.amount
      ) {
        list_id.push({ id: item.input_bill_id, amount: amount })
        item.amount_selled += amount
        amount = 0

        break
      }
    }
    console.log(warehouse)

    await databaseService.warehouse.updateOne({ _id: new ObjectId(id) }, { $set: { shipments: warehouse.shipments } })
    return list_id
  }
  async increaseAmount(id: string, input_bill_id: any[], amount: number) {
    for (const item of input_bill_id) {
      const filter = { _id: new ObjectId(id), shipments: { $elemMatch: { input_bill_id: item.id } } }
      const update = { $inc: { 'shipments.$.amount_selled': -item.amount } }
      await databaseService.warehouse.updateOne(filter, update)
    }
    return
  }

  async getAmoutAvailableById(id: string) {
    const warehouse = await this.getById(id)
    if (!warehouse) {
      return 0
    }
    if (warehouse.shipments === undefined) {
      return 0
    }
    const currentDate = new Date()
    let totalAvailable = 0
    for (const item of warehouse.shipments) {
      if (item.expired_at && item.expired_at > currentDate) {
        totalAvailable += (item.amount || 0) - (item.amount_selled || 0)
      }
    }
    return totalAvailable
  }

  async increaseAmountById(id: string, input_bill_id: string, amount: number) {
    const filter = { _id: new ObjectId(id), shipments: { $elemMatch: { input_bill_id: input_bill_id } } }
    const update = { $inc: { amount: amount } }
    // return await databaseService.warehouse.updateOne(filter, update)
    return await databaseService.warehouse.findOne(filter)
  }
}
const wareHouseService = new WareHouseSerices()
export default wareHouseService
