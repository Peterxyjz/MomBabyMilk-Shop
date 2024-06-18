import { result } from 'lodash'
import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { OrderStatus } from '~/constants/enums'
import { USERS_MESSAGES } from '~/constants/messages'
import Order from '~/model/schemas/Order.schema'
import databaseService from '~/services/database.services'
import orderServices from '~/services/orders.services'

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

  const order = await orderServices.delete(order_id)
}
export const uploadController = async (req: Request, res: Response) => {
  const orderDetails = req.body.cart_list
  const user = req.body.user
  const customer_infor = req.body.customer_infor

  const order_infor = new Order({
    _id: new ObjectId(),
    member_id: user ? user._id : '',
    ship_id: new ObjectId().toString(),
    full_name: customer_infor.full_name,
    address: customer_infor.address,
    phone: customer_infor.phone,
    email: customer_infor.email,
    payment_method: req.body.payment_method,
    status: OrderStatus.Required,
    required_date: new Date(),
    total_price: req.body.total_price
  })
  console.log(orderDetails, user, customer_infor)

  const order = await orderServices.upload(order_infor, orderDetails)

  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    order
  })
}
