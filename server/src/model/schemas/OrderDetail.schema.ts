import { ObjectId } from 'mongodb'
interface OrderDetailType {
  _id?: ObjectId
  order_id: string
  product_id: string
  input_bill_id: any[]
  amount: number
  price: number
}

export default class OrderDetail {
  _id?: ObjectId
  order_id: string
  product_id: string
  input_bill_id: any[]
  amount: number
  price: number
  constructor(order_detail: OrderDetailType) {
    this._id = order_detail._id || new ObjectId()
    this.order_id = order_detail.order_id
    this.product_id = order_detail.product_id
    this.input_bill_id = order_detail.input_bill_id
    this.amount = order_detail.amount
    this.price = order_detail.price
  }
}
