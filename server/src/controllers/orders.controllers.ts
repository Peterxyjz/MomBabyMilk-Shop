import { result } from 'lodash'
import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { OrderStatus } from '~/constants/enums'
import { USERS_MESSAGES } from '~/constants/messages'
import Order from '~/model/schemas/Order.schema'
import databaseService from '~/services/database.services'
import orderServices from '~/services/orders.services'
import { TokenPayload } from '~/model/requests/User.requests'
import usersService from '~/services/users.services'
import wareHouseService from '~/services/wareHouse.services'

export const getAllController = async (req: Request, res: Response) => {
  const orders = await orderServices.getAll()
  const result = await Promise.all(
    orders.map(async (order) => {
      const order_detail = await databaseService.orderDetails.find({ order_id: order._id?.toString() }).toArray()
      return { order, order_detail }
    })
  )

  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}

export const deleteController = async (req: Request, res: Response) => {
  const order_id = req.body.order_id
  const order_details = await databaseService.orderDetails.find({ order_id: order_id }).toArray()
  order_details.forEach(async (item) => {
    await wareHouseService.increaseAmount({ product_id: item.product_id, amount: item.amount })
  })
  const order = await orderServices.delete(order_id)
}
export const uploadController = async (req: Request, res: Response) => {
  const orderDetails = req.body.cart_list
  const user = req.body.user
  const customer_infor = req.body.customer_infor
  const order_infor = new Order({
    _id: new ObjectId(),
    member_id: user ? user._id : '',
    ship_fee: req.body.ship_fee,
    full_name: customer_infor.full_name,
    address: customer_infor.address,
    phone: customer_infor.phone,
    email: customer_infor.email,
    payment_method: req.body.payment_method,
    status: OrderStatus.Required,
    required_date: new Date(),
    total_price: req.body.total_price
  })

  const order = await orderServices.upload(order_infor, orderDetails)

  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    order
  })
}

export const updateStatusController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  const status = req.body.status
  if (!user) {
    return res.status(400).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  const role_name = await usersService.checkRole(user)
  if (role_name !== 'Staff') {
    return res.status(400).json({
      message: 'Bạn không có quyền thay đổi'
    })
  }
  const order_id = req.body.order_id
  if (OrderStatus[status as keyof typeof OrderStatus] === OrderStatus.Cancel) {
    const result = await orderServices.cancel(order_id, status, user_id)
    const order_details = await databaseService.orderDetails.find({ order_id: order_id }).toArray()
    order_details.forEach(async (item) => {
      await wareHouseService.increaseAmount({ product_id: item.product_id, amount: item.amount })
    })
  }
  return res.status(200).json({
    message: 'success',
    result
  })
}
