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
          amount: detail.amount
        })
    )

    await databaseService.inputBillDetails.insertMany(inputBillDetails)

    for (const detail of inputBillDetails) {
      const { product_id, amount } = detail
      const existingProduct = await databaseService.warehouse.findOne({ _id: new ObjectId(product_id) })

      if (existingProduct) {
        await databaseService.warehouse.updateOne({ _id: new ObjectId(product_id) }, { $inc: { amount: amount } })
      } else {
        const newWarehouseEntry = new WareHouse({
          _id: new ObjectId(product_id),
          amount
        })
        await databaseService.warehouse.insertOne(newWarehouseEntry)
      }
    }
    console.log(inputBillId)
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
  const inputBill = await databaseService.inputBills.find({ _id: new ObjectId(req.params.id) }) as InputBill

  if (!inputBill) {
    return res.status(400).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  const result = []
  
  const inputBillDetails = await databaseService.inputBillDetails
    .find({ input_bill_id: inputBill._id?.toString() })
    .toArray()
  result.push({ inputBill: inputBill, inputBillDetails: inputBillDetails })

  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result
  })
}
