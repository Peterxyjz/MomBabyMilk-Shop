import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { VoucherMode } from '~/constants/enums'
import Voucher from '~/model/schemas/Voucher.schema'
import databaseService from '~/services/database.services'
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
