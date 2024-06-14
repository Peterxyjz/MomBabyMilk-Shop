import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import { TokenPayload } from '~/model/requests/User.requests'
import databaseService from '~/services/database.services'

export const uploadController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload // Lấy user_id từ decoded_authorization

  // Tìm phản hồi dựa trên user_id
  const feedback = await databaseService.feedbacks.findOne({ _id: new ObjectId(user_id) })

  // Kiểm tra nếu phản hồi không tồn tại
  if (!feedback) {
    // Nếu phản hồi không tồn tại, tạo một phản hồi mới
    const newFeedback = { user_id: user_id, ...req.body } // Tạo đối tượng phản hồi mới với user_id và dữ liệu từ request body
    await databaseService.feedbacks.insertOne(newFeedback)
  } else {
    // Nếu phản hồi đã tồn tại, cập nhật phản hồi
    await databaseService.feedbacks.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      { $set: req.body },
      { upsert: true }
    )
  }
  // Trả về phản hồi với trạng thái thành công
  return res.status(200).json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS
  })
}
export const getAllController = async (req: Request, res: Response) => {
  const result = await databaseService.feedbacks.find({}).toArray()
  return res.status(200).json({
    message: USERS_MESSAGES.GET_SUCCESS,
    result: result
  })
}

export const deleteController = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await databaseService.feedbacks.deleteOne({ _id: new ObjectId(id) })
  return res.status(200).json({
    message: USERS_MESSAGES.DELETE_SUCCESS,
    result: result
  })
}