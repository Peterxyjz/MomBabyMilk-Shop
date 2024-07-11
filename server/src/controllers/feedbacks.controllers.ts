import { log } from 'console'
import { NextFunction, Request, Response } from 'express'
import { forEach } from 'lodash'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/model/Errors'
import { TokenPayload } from '~/model/requests/User.requests'
import FeedBack from '~/model/schemas/Feeback.schema'
import ReplyFeedBack from '~/model/schemas/ReplyFeeback.schema'
import databaseService from '~/services/database.services'
import feedBackService from '~/services/feedbacks.services'
import replyFeedBackService from '~/services/replyFeedbacks.services'

export const uploadController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload // Lấy user_id từ decoded_authorization
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_NOT_FOUND,
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }

  const feedback = new FeedBack({
    _id: new ObjectId(),
    product_id: req.body.product_id,
    description: req.body.description,
    rating: Number(req.body.rating),
    user_id: user_id
  })

  const result = await feedBackService.upload(feedback)

  // Trả về phản hồi với trạng thái thành công
  return res.status(200).json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result
  })
}
export const replyUploadController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload // Lấy user_id từ decoded_authorization

  const feedback_id = req.body.feedback_id

  const feedback = await databaseService.replyFeebacks.findOne({ _id: new ObjectId(feedback_id) })
  if (feedback) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.FEEDBACK_IS_HAS_BEEN_REPLYED,
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY
    })
  }
  const reply_feedback = new ReplyFeedBack({
    _id: new ObjectId(feedback_id),
    product_id: req.body.product_id,
    description: req.body.description,
    user_id: user_id
  })

  const result = await replyFeedBackService.upload(reply_feedback)
  // Trả về phản hồi với trạng thái thành công
  return res.status(200).json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result
  })
}
export const getAllController = async (req: Request, res: Response) => {
  const feebacks = await databaseService.feedbacks.find({}).toArray()
  const result = []
  for (const feedback of feebacks) {
    const reply_feedback = await databaseService.replyFeebacks.findOne({ _id: new ObjectId(feedback._id) })
    result.push({ ...feedback, reply_feedback: reply_feedback })
  }
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}

export const deteleFeebBackController = async (req: Request, res: Response) => {
  const id = req.params.id
  const feedback = await databaseService.feedbacks.findOne({ _id: new ObjectId(id) })
  const { user_id } = req.decoded_authorization as TokenPayload
  if (!feedback) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.FEEDBACK_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }
  if (feedback.user_id !== user_id) {
    throw new ErrorWithStatus({
      message: 'Đây không phải feeback của bạn',
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }

  const result = Promise.all([
    await databaseService.feedbacks.deleteOne({ _id: new ObjectId(id) }),
    await databaseService.replyFeebacks.deleteOne({ _id: new ObjectId(id) })
  ])

  return res.status(200).json({
    message: USERS_MESSAGES.DELETE_SUCCESS,
    result: result
  })
}

export const deteleReplyFeebBackController = async (req: Request, res: Response) => {
  const id = req.params.id
  const feedback = await databaseService.replyFeebacks.findOne({ _id: new ObjectId(id) })
  const { user_id } = req.decoded_authorization as TokenPayload
  if (!feedback) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.FEEDBACK_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }
  if (feedback.user_id !== user_id) {
    throw new ErrorWithStatus({
      message: 'Đây không phải feeback của bạn',
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }

  const result = await databaseService.replyFeebacks.deleteOne({ _id: new ObjectId(id) })
  return res.status(200).json({
    message: USERS_MESSAGES.DELETE_SUCCESS,
    result: result
  })
}
export const updateFeedBackController = async (req: Request, res: Response) => {
  const id = req.params.id

  const { _id, ...feedback } = req.body

  const result = await databaseService.feedbacks.updateOne({ _id: new ObjectId(id) }, { $set: feedback })
  return res.status(200).json({
    message: USERS_MESSAGES.UPDATE_SUCCESS,
    result: result
  })
}
export const updateReplyFeedBackController = async (req: Request, res: Response) => {
  const id = req.params.id

  const feedback = new ReplyFeedBack({
    _id: new ObjectId(id),
    ...req.body
  })
  const result = await databaseService.replyFeebacks.updateOne({ _id: new ObjectId(id) }, { $set: feedback })
  return res.status(200).json({
    message: USERS_MESSAGES.UPDATE_SUCCESS,
    result: result
  })
}

export const getFeedbackByProIdController = async (req: Request, res: Response) => {
  const product_id = req.params.id
  const feedback = await databaseService.feedbacks.find({ product_id: product_id }).toArray()
  const result = []
  for (const item of feedback) {
    const user = await databaseService.users.findOne({ _id: new ObjectId(item.user_id) })
    const reply_feedback = await databaseService.replyFeebacks.findOne({ _id: new ObjectId(item._id) })
    result.push({ ...item, username: user?.username, reply_feedback: reply_feedback })
  }

  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}

export const getFeedBackByUserIdController = async (req: Request, res: Response) => {
  const user_id = req.params.id
  const feedback = await databaseService.feedbacks.find({ user_id: user_id }).toArray()
  const result = []
  for (const item of feedback) {
    const user = await databaseService.users.findOne({ _id: new ObjectId(item.user_id) })
    const reply_feedback = await databaseService.replyFeebacks.findOne({ _id: new ObjectId(item._id) })
    result.push({ ...item, username: user?.username, reply_feedback: reply_feedback })
  }

  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}
