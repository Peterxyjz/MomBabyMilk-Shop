import { ObjectId } from 'mongodb'
import { VoucherMode } from '~/constants/enums'

interface VoucherType {
  _id?: ObjectId
  voucher_type?: VoucherMode
  membership?: number
  expire_date: Date
  discount: number
  amount?: number
}

export default class Voucher {
  _id?: ObjectId
  voucher_type?: VoucherMode
  membership?: number
  discount: number
  amount?: number
  expire_date: Date
  constructor(voucher: VoucherType) {
    this._id = voucher._id || new ObjectId()
    this.voucher_type = voucher.voucher_type || VoucherMode.User
    this.membership = voucher.membership || 0
    this.expire_date = voucher.expire_date
    this.discount = voucher.discount
    this.amount = voucher.amount || 0
  }
}
