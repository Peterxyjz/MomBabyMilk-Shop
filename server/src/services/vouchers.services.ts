import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'

import { ErrorWithStatus } from '~/model/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

import Voucher from '~/model/schemas/Voucher.schema'
import databaseService from './database.services'
config()

class VoucherServices {
  async upload(voucher: Voucher) {
    return await databaseService.vouchers.insertOne(voucher)
  }
  async getAll() {
    return await databaseService.vouchers.find({}).toArray()
  }

  async getById(id: string) {
    const filter = { _id: new ObjectId(id) }
    const voucher = await databaseService.vouchers.findOne(filter)
    if (!voucher) {
      throw new ErrorWithStatus({
        message: 'Mã không tìm thấy',
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY
      })
    }

    return voucher
  }
  async decreaseAmount(id: string) {
    const vouchcer = await this.getById(id)

    if ((vouchcer.amount as number) < 1) {
      throw new ErrorWithStatus({
        message: 'Voucer hết lượt sử dụng',
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY
      })
    }
    return await databaseService.vouchers.updateOne(
      { _id: new ObjectId(id) },
      { $set: { amount: (vouchcer.amount as number) - 1 } }
    )
  }

  async delete(id: string) {
    return await databaseService.vouchers.deleteOne({ _id: new ObjectId(id) })
  }
}
const voucherServices = new VoucherServices()
export default voucherServices
