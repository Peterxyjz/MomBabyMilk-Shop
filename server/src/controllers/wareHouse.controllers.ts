import { NextFunction, Request, Response } from 'express'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'

export const getAllController = async (req: Request, res: Response) => {
  const result = await databaseService.warehouse.find({}).toArray()
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}
