import { ObjectId } from 'mongodb'
interface InputBillType {
  _id?: ObjectId
  input_date?: Date
}

export default class InputBill {
  _id?: ObjectId
  input_date?: Date
  constructor(input_bill?: InputBillType) {
    const date = new Date()
    this._id = new ObjectId() // tự tạo id
    this.input_date = date
  }
}
