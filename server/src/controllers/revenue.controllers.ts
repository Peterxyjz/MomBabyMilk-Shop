import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/model/requests/User.requests'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'

export const getAllController = async (req: Request, res: Response) => {
  const result = await databaseService.revenue.find({}).toArray()
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}
