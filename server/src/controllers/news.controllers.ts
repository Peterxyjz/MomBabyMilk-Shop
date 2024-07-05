import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/model/Errors'
import { TokenPayload } from '~/model/requests/User.requests'
import News from '~/model/schemas/News.schema'

import databaseService from '~/services/database.services'
import newsServices from '~/services/news.services'
import usersService from '~/services/users.services'

export const uploadController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload // Lấy user_id từ decoded_authorization

  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    throw new ErrorWithStatus({ message: USERS_MESSAGES.USER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }
  const role_name = await usersService.checkRole(user)
  if (role_name !== 'Staff') {
    throw new ErrorWithStatus({ message: USERS_MESSAGES.PERMISSION_DENIED, status: HTTP_STATUS.UNAUTHORIZED })
  }
  // Tìm phân hồi của user_id trong db
  const news = new News({
    _id: new ObjectId(),
    news_name: req.body.news_name,
    staff_id: user_id,
    product_id: req.body.product_id,
    description: req.body.description,
    created_at: new Date()
  })
  const result = await newsServices.upload(news)

  // Trả về phản hồi với trạng thái thành công
  return res.status(200).json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result
  })
}

export const getAllController = async (req: Request, res: Response) => {
  const result = await databaseService.news.find({}).toArray()
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}

export const getNewsController = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await databaseService.news.findOne({ _id: new ObjectId(id) })
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}

export const getNewsByProIdController = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await databaseService.news.find({ product_id: id }).toArray()
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}

export const deteleController = async (req: Request, res: Response) => {
  const id = req.params.id
  const news = await databaseService.news.findOne({ _id: new ObjectId(id) })
  const { user_id } = req.decoded_authorization as TokenPayload
  if (!news) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.NEWS_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.NEWS_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }
  const role_name = await usersService.checkRole(user)
  if (role_name !== 'Staff') {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.PERMISSION_DENIED,
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }

  const result = await databaseService.news.deleteOne({ _id: new ObjectId(id) })
  return res.status(200).json({
    message: USERS_MESSAGES.DELETE_SUCCESS,
    result: result
  })
}

export const updateNewsController = async (req: Request, res: Response) => {
  const id = req.params.id
  const { user_id } = req.decoded_authorization as TokenPayload // Lấy user_id từ decoded_authorization

  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    throw new ErrorWithStatus({ message: USERS_MESSAGES.USER_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }
  const role_name = await usersService.checkRole(user)
  if (role_name !== 'Staff') {
    throw new ErrorWithStatus({ message: USERS_MESSAGES.PERMISSION_DENIED, status: HTTP_STATUS.UNAUTHORIZED })
  }

  const news = await databaseService.news.findOne({ _id: new ObjectId(id) })
  if (!news) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.NEWS_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }
  const news_update = {
    _id: new ObjectId(id),
    staff_id: user_id,
    product_id: req.body.product_id,
    description: req.body.description
  }

  const result = await databaseService.news.updateOne({ _id: new ObjectId(id) }, { $set: news_update })

  return res.status(200).json({
    message: USERS_MESSAGES.UPDATE_SUCCESS,
    result: result
  })
}
