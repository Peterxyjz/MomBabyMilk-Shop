import { ObjectId } from 'mongodb'
interface VoucherType {
  _id?: ObjectId
  expire_date: Date
  discount: number
  amount?: number
}

export default class Voucher {
  _id?: ObjectId

  discount: number
  amount?: number
  expire_date: Date
  constructor(voucher: VoucherType) {
    this._id = voucher._id || new ObjectId()
    this.expire_date = voucher.expire_date
    this.discount = voucher.discount
    this.amount = voucher.amount || 0
  }
}
