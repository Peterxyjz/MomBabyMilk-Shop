import { NextFunction, Request, Response } from 'express'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import productsService from '~/services/products.services'
import wareHouseService from '~/services/wareHouse.services'

export const getAllController = async (req: Request, res: Response) => {
  const warehouse = await databaseService.warehouse.find({}).toArray()
  const result = []
  for (const item of warehouse) {
    const product = await productsService.getById(item._id.toString())
    if (product != null) {
      let amount = 0
      if (item.shipments) {
        for (const shipment of item.shipments) {
          if (shipment.amount_selled !== undefined) {
            amount += shipment.amount - shipment.amount_selled
          }
        }
      }
      result.push({
        ...item,
        product_name: product.product_name,
        imgUrl: product.imgUrl,
        amount_shipment: item.shipments?.length,
        amount: amount
      })
    }
  }
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}
export const getAmountByIdController = async (req: Request, res: Response) => {
  const result = await wareHouseService.getAmoutAvailableById(req.params.id)
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}
