import { ObjectId } from 'mongodb'
interface OrderDetailType {
  _id?: ObjectId
  order_id: string
  product_id: string
  amount: number
  price: number
  status: boolean
}

export default class OrderDetail {
  _id?: ObjectId
  order_id: string
  product_id: string
  amount: number
  price: number
  status: boolean
  constructor(order_detail: OrderDetailType) {
    this._id = order_detail._id || new ObjectId()
    this.order_id = order_detail.order_id
    this.product_id = order_detail.product_id
    this.amount = order_detail.amount
    this.price = order_detail.price
    this.status = order_detail.status
  }
}
