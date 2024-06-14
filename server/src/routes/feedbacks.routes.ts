import { Router } from 'express'
import { getAllController, uploadController } from '~/controllers/feedbacks.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const feedbacksRouter = Router()

//upload:
feedbacksRouter.post('/upload', accessTokenValidator, wrapAsync(uploadController))
feedbacksRouter.get('/all-feedback', wrapAsync(getAllController))
feedbacksRouter.delete('/delete', wrapAsync(getAllController))
export default feedbacksRouter
