import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { VoucherMode } from '~/constants/enums'
import { USERS_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/model/requests/User.requests'
import Voucher from '~/model/schemas/Voucher.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
import voucherServices from '~/services/vouchers.services'

export const uploadController = async (req: Request, res: Response) => {
  const voucher_type = req.body.voucher_type
  const membership = req.body.membership
  const expire_date = req.body.expire_date
  const discount = req.body.discount
  const amount = req.body.amount

  const voucher = new Voucher({
    _id: new ObjectId(),
    voucher_type: voucher_type,
    membership: membership,
    expire_date: expire_date,
    discount: discount,
    amount: amount
  })
  console.log(voucher)

  const result = await voucherServices.upload(voucher)
  return res.status(200).json({
    message: 'Tạo voucer thành công',
    result: result
  })
}

export const getVoucherController = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await voucherServices.getById(id)
  return res.json(result)
}

export const getAllVoucherController = async (req: Request, res: Response) => {
  const result = await databaseService.vouchers.find({}).toArray()
  return res.status(200).json({
    message: 'Sucess',
    result: result
  })
}
export const getVoucherTypeController = async (req: Request, res: Response) => {
  const enumEntries: { id: number; name: string }[] = []

  for (const [key, value] of Object.entries(VoucherMode)) {
    if (typeof value === 'number') {
      enumEntries.push({ id: value, name: key })
    }
  }

  return res.status(200).json({
    message: 'Sucess',
    result: enumEntries
  })
}

export const deleteController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload //lấy user_id từ decoded_authorization
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    return res.status(400).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  const role_name = await usersService.checkRole(user)
  if (role_name !== 'Staff') {
    return res.status(400).json({
      message: 'Bạn không có quyền xóa voucher'
    })
  }

  const result = await voucherServices.delete(req.body.id)

  return res.status(200).json({
    message: 'Sucess',
    result
  })
}

export const updateController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload //lấy user_id từ decoded_authorization
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    return res.status(400).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  const role_name = await usersService.checkRole(user)
  if (role_name !== 'Staff') {
    return res.status(400).json({
      message: 'Bạn không có quyền chỉnh sửa voucher'
    })
  }

  const result = await voucherServices.update(req.params.id, req.body)

  return res.status(200).json({
    message: 'Sucess',
    result
  })
}
