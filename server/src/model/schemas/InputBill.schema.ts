import { ObjectId } from 'mongodb'
interface InputBillType {
  _id?: ObjectId
  prod_id: string
  brand_id: string
  amount: number
  input_date?: Date
}

export default class InputBill {
  _id?: ObjectId
  prod_id: string
  brand_id: string
  amount: number
  input_date ?: Date
  constructor(input_bill: InputBillType) {
    const date = new Date()
    this._id = input_bill._id || new ObjectId() // tự tạo id
    this.prod_id = input_bill.prod_id
    this.brand_id = input_bill.brand_id
    this.amount = input_bill.amount
    this.input_date = input_bill.input_date || date
  }
}
