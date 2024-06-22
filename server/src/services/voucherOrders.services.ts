import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'

import { ErrorWithStatus } from '~/model/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

import Voucher from '~/model/schemas/Voucher.schema'
import databaseService from './database.services'
import VoucherOrder from '~/model/schemas/VoucherOrders.schema'
config()

class VoucherOrderServices {
  async upload(voucher_order: VoucherOrder) {
    return await databaseService.voucherOrders.insertOne(voucher_order)
  }
  async getAll() {
    return await databaseService.vouchers.find({}).toArray()
  }

  async getByOrderId(id: string) {
    const filter = { order_id: id }
    const voucher_order = await databaseService.voucherOrders.findOne(filter)
    if (!voucher_order) {
      throw new ErrorWithStatus({
        message: 'Mã không tìm thấy',
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY
      })
    }

    return voucher_order
  }
  
}
const voucherOrderServices = new VoucherOrderServices()
export default voucherOrderServices
