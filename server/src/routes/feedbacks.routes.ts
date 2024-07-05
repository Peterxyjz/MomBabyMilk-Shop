import { Router } from 'express'
import {
  deteleFeebBackController,
  getAllController,
  getFeedbackByProIdController,
  getFeedBackByUserIdController,
  replyUploadController,
  updateFeedBackController,
  updateReplyFeedBackController,
  uploadController
} from '~/controllers/feedbacks.controllers'
import { updateController } from '~/controllers/products.controllers'
import { updateFeedBackValidator } from '~/middlewares/feedbacks.middwares'
import { isParamsIdValidator } from '~/middlewares/products.middleware'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const feedbacksRouter = Router()

//upload:
feedbacksRouter.post('/feedback/upload', accessTokenValidator, wrapAsync(uploadController))
feedbacksRouter.post('/reply/upload', accessTokenValidator, wrapAsync(replyUploadController))
feedbacksRouter.get('/all-feedback', wrapAsync(getAllController))

feedbacksRouter.delete(
  '/feedback/delete/:id',
  accessTokenValidator,
  isParamsIdValidator,
  wrapAsync(deteleFeebBackController)
)
feedbacksRouter.delete(
  '/reply/delete/:id',
  accessTokenValidator,
  isParamsIdValidator,
  wrapAsync(deteleFeebBackController)
)

feedbacksRouter.post(
  '/feedback/:id',
  accessTokenValidator,
  isParamsIdValidator,
  updateFeedBackValidator,
  wrapAsync(updateFeedBackController)
)
feedbacksRouter.post(
  '/reply/:id',
  accessTokenValidator,
  isParamsIdValidator,
  updateFeedBackValidator,
  wrapAsync(updateReplyFeedBackController)
)
feedbacksRouter.get('/product/:id', isParamsIdValidator, wrapAsync(getFeedbackByProIdController))
//getFeedBackByUserId
feedbacksRouter.get('/user/:id', isParamsIdValidator, wrapAsync(getFeedBackByUserIdController))
export default feedbacksRouter
