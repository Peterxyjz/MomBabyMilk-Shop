import { Router } from 'express'
import { getAllController, getFeebBackController, updateFeedBackController, uploadController } from '~/controllers/feedbacks.controllers'
import { updateController } from '~/controllers/products.controllers'
import { updateFeedBackValidator } from '~/middlewares/feedbacks.middwares'
import { isParamsIdValidator } from '~/middlewares/products.middleware'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const feedbacksRouter = Router()

//upload:
feedbacksRouter.post('/upload', accessTokenValidator, wrapAsync(uploadController))
feedbacksRouter.get('/all-feedback', wrapAsync(getAllController))
feedbacksRouter.delete('/delete', wrapAsync(getAllController))
feedbacksRouter.patch(
    '/feedback/:id',
    accessTokenValidator,
    isParamsIdValidator,
    updateFeedBackValidator,
    wrapAsync(updateFeedBackController)
  )
  feedbacksRouter.get('/feedback/:id', isParamsIdValidator, wrapAsync(getFeebBackController))
export default feedbacksRouter
