import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/model/requests/User.requests'
import Product from '~/model/schemas/Product.schema'
import brandsService from '~/services/brands.services'
import categoriesService from '~/services/categories.services'
import databaseService from '~/services/database.services'
import productsService from '~/services/products.services'
import usersService from '~/services/users.services'
import wareHouseService from '~/services/wareHouse.services'
import Brand from '~/model/schemas/Brand.schema'
import Category from '~/model/schemas/Category.schema'
import WareHouse from '~/model/schemas/WareHouse.schema'
export const uploadController = async (req: Request, res: Response) => {
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
  const product = new Product(req.body)
  const result = await productsService.upload(product)
  return res.status(200).json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: result
  })
}

export const getAllController = async (req: Request, res: Response) => {
  const products = await productsService.getAll()
  const feedbacks = await databaseService.feedbacks.find({}).toArray()
  const result = []

  for (const element of products) {
    const brand = (await brandsService.getById(element.brand_id)) as Brand
    const category = (await categoriesService.getById(element.category_id)) as Category
    const warehouse = (await wareHouseService.getById(element._id?.toString())) as WareHouse

    const productFeedbacks = feedbacks.filter((feedback) => feedback.product_id === element._id?.toString())
    const rating =
      productFeedbacks.length > 0
        ? Math.min(productFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / productFeedbacks.length, 5)
        : 0

    result.push({
      ...element,
      brand_name: brand.brand_name,
      category_name: category.category_name,
      amount: warehouse.amount,
      reviewer: productFeedbacks.length,
      rating: rating
    })
  }

  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}

export const getController = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await productsService.getById(id)
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}

//update:
export const updateController = async (req: Request, res: Response) => {
  const id = req.body.id
  const url = req.body.url

  const product_req = req.body.product
  console.log(product_req)

  if (product_req) {
    await productsService.update(id, product_req)
  }
  const product = new Product(req.body)
  const result = await productsService.updateUrl(id, url)
  return res.status(200).json({
    message: USERS_MESSAGES.UPDATE_SUCCESS,
    result: result
  })
}

//notActive:
export const notActiveController = async (req: Request, res: Response) => {
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
      message: 'Bạn không có quyền chỉnh sửa sản phẩm'
    })
  }
  const id = req.params.id
  const result = await productsService.notActive(id)
  return res.status(200).json({
    message: USERS_MESSAGES.DELETE_SUCCESS,
    result: result
  })
}
