import { result } from 'lodash'
import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/model/requests/User.requests'
import InputBill from '~/model/schemas/InputBill.schema'
import InputBillDetail from '~/model/schemas/InputBillDetail.schema' // Ensure you import InputBillDetail
import WareHouse from '~/model/schemas/WareHouse.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
import { RevenueStatus } from '~/constants/enums'

export const uploadController = async (req: Request, res: Response) => {
  const inputBill = new InputBill()
  const inputBillDetailList = req.body.inputBillDetailList

  try {
    const result = await databaseService.inputBills.insertOne(inputBill)
    const inputBillId = result.insertedId

    const inputBillDetails = inputBillDetailList.map(
      (detail: any) =>
        new InputBillDetail({
          input_bill_id: inputBillId.toString(),
          product_id: detail.product_id,
          amount: detail.amount,
          expired_at: new Date(detail.expired_at),
          created_at: new Date(detail.created_at)
        })
    )

    await databaseService.inputBillDetails.insertMany(inputBillDetails)

    for (const detail of inputBillDetails) {
      const { product_id } = detail
      const existingProduct = await databaseService.warehouse.findOne({ _id: new ObjectId(product_id) })

      if (existingProduct) {
        await databaseService.warehouse.updateOne(
          { _id: new ObjectId(product_id) },
          { $push: { shipments: { ...detail, amount_selled: 0 } } }
        )
      } else {
        const newWarehouseEntry = new WareHouse({
          _id: new ObjectId(product_id)
        })
        newWarehouseEntry.shipments?.push({ ...detail, amount_selled: 0 })
        await databaseService.warehouse.insertOne(newWarehouseEntry)
      }
    }

    const date = new Date()
    await databaseService.revenue.insertOne({
      _id: inputBillId,
      type: RevenueStatus.InputBill,
      total: Number(req.body.total),
      completed_date: date
    })
    return res.status(200).json({
      message: USERS_MESSAGES.UPLOAD_SUCCESS,
      inputBillId: inputBillId,
      inputBillDetails: inputBillDetails
    })
  } catch (error) {
    console.error('Error uploading input bill details:', error)
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

export const getAllController = async (req: Request, res: Response) => {
  const inputBills = await databaseService.inputBills.find({}).toArray()

  const result = []

  for (const inputBill of inputBills) {
    const inputBillDetails = await databaseService.inputBillDetails
      .find({ input_bill_id: inputBill._id?.toString() })
      .toArray()
    result.push({ inputBill: inputBill, inputBillDetails: inputBillDetails })
  }

  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
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
      message: 'Bạn không có quyền chỉnh sửa input bill'
    })
  }

  const inputBill = await databaseService.inputBills.findOne({ _id: new ObjectId(req.params.id) })

  if (!inputBill) {
    return res.status(400).json({
      message: 'khong tim thay'
    })
  }

  const inputBillDetailList = req.body.inputBillDetailList
  const inputBillDetails = inputBillDetailList.map(
    (detail: any) =>
      new InputBillDetail({
        _id: new ObjectId(detail._id),
        input_bill_id: detail.input_bill_id,
        product_id: detail.product_id,
        amount: detail.amount,
        expired_at: detail.expired_at,
        created_at: detail.created_at
      })
  )

  for (const detail of inputBillDetails) {
    const input_bill_detail = await databaseService.inputBillDetails.findOne({ _id: detail._id })
    if (!input_bill_detail) {
      return res.status(400).json({
        message: 'InputBillDetail _id is required'
      })
    }

    await databaseService.inputBillDetails.updateOne({ _id: detail._id }, { $set: detail })
  }

  return res.status(200).json({
    message: 'Update success'
  })
}
