import { ObjectId } from 'mongodb'
interface InputBillDetailType {
  _id?: ObjectId
  input_bill_id: string
  product_id: string
  amount: number
  expired_at: Date
  created_at: Date
}

export default class InputBillDetail {
  _id?: ObjectId
  input_bill_id: string
  product_id: string
  amount: number
  expired_at: Date
  created_at: Date
  constructor(input_bill: InputBillDetailType) {
    this._id = input_bill._id || new ObjectId()
    this.input_bill_id = input_bill.input_bill_id
    this.product_id = input_bill.product_id
    this.amount = input_bill.amount
    this.expired_at = input_bill.expired_at
    this.created_at = input_bill.created_at
  }
}
