import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from './database.services'
import WareHouse from '~/model/schemas/WareHouse.schema'
import Order from '~/model/schemas/Order.schema'
import OrderDetail from '~/model/schemas/OrderDetail.schema'
import { OrderStatus } from '~/constants/enums'
config()

class OrderServinces {
  async upload(order_infor: Order, orderDetails: any) {
    const order = new Order({
      _id: new ObjectId(order_infor._id?.toString()),
      ...order_infor
    })

    orderDetails.forEach((item: any) => {
      const order_detail = new OrderDetail({
        _id: new ObjectId(),
        order_id: order_infor._id?.toString() || '',
        product_id: item._id,
        amount: item.quantity,
        price: item.price
      })

      databaseService.orderDetails.insertOne(order_detail)
    })

    return await databaseService.orders.insertOne(order)
  }
  async getAll() {
    return await databaseService.orders.find({}).toArray()
  }

  async getById(id: string) {
    const filter = { product_id: id }
    return await databaseService.orders.findOne(filter)
  }

  async delete(id: string) {
    const filter = { _id: new ObjectId(id) }
    await databaseService.orderDetails.deleteMany({ order_id: id })
    return await databaseService.orders.deleteOne(filter)
  }
  async cancel(id: string, status: string, user_id: string) {
    const filter = { _id: new ObjectId(id) }
    const update = { $set: { status: OrderStatus[status as keyof typeof OrderStatus], staff_id: user_id } }

    return await databaseService.orders.updateOne(filter, update)
  }

  async getSalesByProductId(id: string) {
    const filter = { product_id: id }
    let sales = 0

    const orderDetails = await databaseService.orderDetails.find(filter).toArray()

    for (const element of orderDetails) {
      sales += element.amount
    }

    return sales
  }
}
const orderServices = new OrderServinces()
export default orderServices
