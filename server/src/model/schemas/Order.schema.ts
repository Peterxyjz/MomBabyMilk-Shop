import { ObjectId } from 'mongodb'
import { OrderStatus } from '~/constants/enums'
interface OrderType {
  _id?: ObjectId
  member_id?: string
  staff_id?: string
  voucher_code?: string
  voucher_fee?: number
  ship_fee: number
  full_name: string
  address: string
  phone: string
  status?: OrderStatus
  email: string
  payment_method: string
  required_date?: Date
  accepted_date?: Date
  shipped_date?: Date
  total_price?: number
}

export default class Order {
  _id?: ObjectId
  member_id?: string
  staff_id?: string
  voucher_code?: string
  voucher_fee?: number
  ship_fee: number
  full_name: string
  address: string
  phone: string
  status?: OrderStatus
  email: string
  payment_method: string
  required_date?: Date
  accepted_date?: Date
  shipped_date?: Date
  total_price?: number
  constructor(order: OrderType) {
    const date = new Date()
    this._id = order._id || new ObjectId() // tự tạo id
    this.member_id = order.member_id || ''
    this.staff_id = order.staff_id || ''
    this.voucher_code = order.voucher_code || ''
    this.voucher_fee = order.voucher_code ? order.voucher_fee : 0
    this.ship_fee = order.ship_fee
    this.full_name = order.full_name
    this.address = order.address
    this.phone = order.phone
    this.status = order.status || OrderStatus.Required
    this.email = order.email
    this.payment_method = order.payment_method
    this.required_date = order.required_date || date
    this.accepted_date = order.accepted_date || undefined
    this.shipped_date = order.shipped_date || undefined
    this.total_price = order.total_price || 0
  }
}
