import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from './database.services'
import WareHouse from '~/model/schemas/WareHouse.schema'
import Order from '~/model/schemas/Order.schema'
import OrderDetail from '~/model/schemas/OrderDetail.schema'
import { OrderStatus, RevenueStatus } from '~/constants/enums'
import wareHouseService from './wareHouse.services'
import { ErrorWithStatus } from '~/model/Errors'
import Revenue from '~/model/schemas/Revenue.schema'
import revenueServices from './revenue.services'
config()

class OrderServinces {
  async upload(order_infor: Order, orderDetails: any) {
    const order = new Order({
      _id: new ObjectId(order_infor._id?.toString()),
      ...order_infor
    })

    orderDetails.forEach(async (item: any) => {
      const order_detail = new OrderDetail({
        _id: new ObjectId(),
        order_id: order_infor._id?.toString() || '',
        product_id: item._id,
        amount: item.quantity,
        price: item.price
      })

      await wareHouseService.decreaseAmount({ product_id: item._id, amount: item.quantity })
      databaseService.orderDetails.insertOne(order_detail)
    })
    return await databaseService.orders.insertOne(order)
  }
  async getAll() {
    return await databaseService.orders.find({}).toArray()
  }

  async getById(id: string) {
    const filter = { _id: new ObjectId(id) }
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

  async updateStatus(id: string, status: string, user_id: string) {
    const filter = { _id: new ObjectId(id) }
    const order = await databaseService.orders.findOne(filter)
    if (!order) {
      throw new ErrorWithStatus({
        message: 'Không tìm thấy đơn hàng',
        status: 400
      })
    }
    if (OrderStatus[status as keyof typeof OrderStatus] === OrderStatus.Processing) {
      return await databaseService.orders.updateOne(filter, {
        $set: { status: OrderStatus[status as keyof typeof OrderStatus], staff_id: user_id, accepted_date: new Date() }
      })
    }
    return await databaseService.orders.updateOne(filter, {
      $set: { status: OrderStatus[status as keyof typeof OrderStatus], staff_id: user_id }
    })
  }

  async getSalesByProductId(id: string) {
    const filter = { product_id: id }
    let sales = 0

    const orderDetails = await databaseService.orderDetails.find(filter).toArray()

    for (const element of orderDetails) {
      const order = await databaseService.orders.findOne({ _id: new ObjectId(element.order_id) })
      if (order?.status !== OrderStatus.Cancel) sales += element.amount
    }

    return sales
  }
  async updateOrderStatus() {
    const twelveHoursAgo = new Date()
    twelveHoursAgo.setDate(twelveHoursAgo.getDate() - 3) // Lấy thời gian 3 Ngày trước

    const orders = await databaseService.orders
      .find({
        status: OrderStatus.Processing,
        accepted_date: { $lte: twelveHoursAgo }
      })
      .toArray()
    orders.forEach(async (order) => {
      const date = new Date()
      Promise.all([
        await databaseService.orders.updateOne(
          { _id: new ObjectId(order._id) },
          { $set: { status: OrderStatus.Completed, shipped_date: new Date() } }
        ),

        await revenueServices.upload(
          new Revenue({
            _id: order._id,
            type: RevenueStatus.Order,
            total: Number(order.total_price),
            completed_date: date
          })
        )
      ])

      if (order.member_id) {
        const incrementValue = Number(Number(order.total_price) / 100)
        await databaseService.users.updateOne(
          { _id: new ObjectId(order.member_id) },
          { $inc: { menber_ship: incrementValue } }
        )
      }
    })

    return true
  }

  async getByUserId(id: string) {
    return await databaseService.orders.find({ member_id: id }).toArray()
  }
}
const orderServices = new OrderServinces()
export default orderServices
