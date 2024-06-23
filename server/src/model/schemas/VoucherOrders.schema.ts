import { ObjectId } from 'mongodb'


interface VoucherOrderType {
  _id?: ObjectId
  voucher_id: string
  order_id: string
}

export default class VoucherOrder {
  _id?: ObjectId
  voucher_id: string
  order_id: string
  constructor(voucher: VoucherOrderType) {
    this._id = voucher._id || new ObjectId()
    this.voucher_id = voucher.voucher_id
    this.order_id = voucher.order_id
  }
}
