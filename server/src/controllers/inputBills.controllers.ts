import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/model/requests/User.requests'
import InputBill from '~/model/schemas/InputBill.schema'
import InputBillDetail from '~/model/schemas/InputBillDetail.schema' // Ensure you import InputBillDetail
import WareHouse from '~/model/schemas/WareHouse.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'

export const uploadController = async (req: Request, res: Response) => {
  // const { user_id } = req.decoded_authorization as TokenPayload; // Lấy user_id từ decoded_authorization
  // const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) });
  // if (!user) {
  //   return res.status(400).json({
  //     message: USERS_MESSAGES.USER_NOT_FOUND,
  //   });
  // }
  // const role_name = await usersService.checkRole(user);

  // if (role_name !== 'Staff') {
  //   return res.status(400).json({
  //     message: 'Bạn không có quyền thêm sản phẩm',
  //   });
  // }

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
      const existingProduct = await databaseService.warehouse.findOne({_id: new ObjectId(product_id)})

      if (existingProduct) {
        await databaseService.warehouse.updateOne({_id: new ObjectId(product_id) }, { $inc: { amount: amount } })
      } else {
        const newWarehouseEntry = new WareHouse({
          _id: new ObjectId(product_id),
          amount
        })
        await databaseService.warehouse.insertOne(newWarehouseEntry)
      }
    }

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
