import { result } from 'lodash'
import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { OrderStatus, VoucherMode } from '~/constants/enums'
import { USERS_MESSAGES } from '~/constants/messages'
import Order from '~/model/schemas/Order.schema'
import databaseService from '~/services/database.services'
import orderServices from '~/services/orders.services'
import { TokenPayload } from '~/model/requests/User.requests'
import usersService from '~/services/users.services'
import wareHouseService from '~/services/wareHouse.services'
import { generateInvoiceHTML } from '~/helper/emailTemplate'
import sendMail from '~/helper/send.mail'
import voucherOrderServices from '~/services/voucherOrders.services'
import VoucherOrder from '~/model/schemas/VoucherOrders.schema'
import voucherServices from '~/services/vouchers.services'
import Voucher from '~/model/schemas/Voucher.schema'

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

export const getOrderController = async (req: Request, res: Response) => {
  const user_id = req.body.user_id
  const orders = await orderServices.getByUserId(user_id)
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

export const getOrderByIdController = async (req: Request, res: Response) => {
  const order_id = req.params.id
  const [order, order_detail] = await Promise.all([
    orderServices.getById(order_id),
    databaseService.orderDetails.find({ order_id: order_id }).toArray()
  ])
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: { order, order_detail }
  })

  // const user_id = req.body.user_id
  // const orders = await orderServices.getByUserId(user_id)
  // const result = await Promise.all(
  //   orders.map(async (order) => {
  //     const order_detail = await databaseService.orderDetails.find({ order_id: order._id?.toString() }).toArray()
  //     return { order, order_detail }
  //   })
  // )
  // return res.status(200).json({
  //   message: USERS_MESSAGES.GET_SUCCESS,
  //   result: result
  // })
}

export const deleteController = async (req: Request, res: Response) => {
  const order_id = req.body.order_id
  const order_details = await databaseService.orderDetails.find({ order_id: order_id }).toArray()
  order_details.forEach(async (item) => {
    await wareHouseService.increaseAmount(item.product_id, item.input_bill_id, item.amount)
  })
  const order = await orderServices.delete(order_id)
}
export const uploadController = async (req: Request, res: Response) => {
  const voucher_code = req.body?.voucher_code || ''
  const voucher_fee = req.body?.voucher_fee || 0
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
    total_price: req.body.total_price,
    voucher_code: voucher_code,
    voucher_fee: voucher_fee
  })

  const [order] = await Promise.all([orderServices.upload(order_infor, orderDetails)])
  if (voucher_code) {
    const voucher = await voucherServices.getById(voucher_code)
    if (voucher) {
      if (voucher.voucher_type === VoucherMode.Member && user) {
        user.member_ship = user.member_ship - (voucher.membership as number)
      }
    }
    await Promise.all([
      voucherOrderServices.upload(
        new VoucherOrder({
          _id: new ObjectId(),
          order_id: order_infor._id?.toString() as string,
          voucher_id: voucher_code
        })
      ),
      voucherServices.decreaseAmount(voucher_code)
    ])

    if (user) {
      await databaseService.users.updateOne(
        { _id: new ObjectId(user._id) },
        {
          $set: {
            role_id: user.role_id,
            full_name: user.full_name,
            email: user.email,
            date_of_birth: user.date_of_birth,
            password: user.password,
            country: user.country,
            province: user.province,
            district: user.district,
            ward: user.ward,
            address: user.address,
            phone: user.phone,
            member_ship: user.member_ship,
            username: user.username,
            email_verify_token: user.email_verify_token,
            forgot_password_token: user.forgot_password_token,
            verify: user.verify,
            isActive: user.isActive
          }
        }
      )
    }
  }

  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    order,
    point: user?.member_ship
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
    for (const detail of order_details) {
      await wareHouseService.increaseAmount(detail.product_id, detail.input_bill_id, detail.amount)
    }

    const order = await orderServices.getById(order_id)
    if (order) {
      const member_id = order.member_id
      if (order.voucher_code && member_id) {
        const member = await databaseService.users.findOne({ _id: new ObjectId(member_id) })
        const voucher = await voucherServices.getById(order.voucher_code)
        if (voucher.voucher_type === VoucherMode.Member) {
          await databaseService.users.updateOne(
            { _id: new ObjectId(member_id) },
            { $inc: { member_ship: voucher.membership } }
          )
        }
      }
    }

    return res.status(200).json({
      message: 'success',
      result
    })
  }
  const result = await orderServices.updateStatus(order_id, status, user_id)
  const order = await orderServices.getById(order_id)
  const orderDetails = await databaseService.orderDetails.find({ order_id: order_id }).toArray()
  if (order) {
    const listProduct = []
    for (const detail of orderDetails) {
      const product = await databaseService.products.findOne({ _id: new ObjectId(detail.product_id) })
      listProduct.push({
        ...detail,
        product_name: product?.product_name
      })
    }
    const emailHtml = generateInvoiceHTML(order, listProduct)
    sendMail({
      email: order.email,
      subject: 'Email Verification Mail',
      html: emailHtml
    })
    return res.status(200).json({
      message: 'success',
      result
    })
  } else {
    return res.status(400).json({
      message: 'Order not found'
    })
  }
}
