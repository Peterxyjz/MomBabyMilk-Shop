import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/model/requests/User.requests'
import Brand from '~/model/schemas/Brand.schema'
import brandsService from '~/services/brands.services'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'

export const uploadController = async (req: Request, res: Response) => {
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
      message: 'Bạn không có quyền thêm sản phẩm'
    })
  }
  const brand = new Brand(req.body) // lấy category từ req

  const result = await brandsService.upload(brand)
  return res.status(200).json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: result
  })
}

export const getAllController = async (req: Request, res: Response) => {
  const result = await brandsService.getAll()
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}

export const getController = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await brandsService.getById(id)
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
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
  if (role_name === 'Member') {
    return res.status(400).json({
      message: 'Bạn không có quyền thêm sản phẩm'
    })
  }
  const id = req.params.id
  const brand = new Brand(req.body)
  brand._id = new ObjectId(id)
  const result = await brandsService.update(id, brand)
  return res.status(200).json({
    message: USERS_MESSAGES.UPDATE_SUCCESS,
    result: result
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
  if (role_name === 'Member') {
    return res.status(400).json({
      message: 'Bạn không có quyền thêm sản phẩm'
    })
  }
  const id = req.params.id
  const result = await brandsService.delete(id)
  return res.status(200).json({
    message: USERS_MESSAGES.DELETE_SUCCESS,
    result: result
  })
}
