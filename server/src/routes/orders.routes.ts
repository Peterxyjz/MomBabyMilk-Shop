import { Router } from 'express'
import {
  deleteController,
  getAllController,
  getByUserController,
  updateStatusController,
  uploadController
} from '~/controllers/orders.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'

import { wrapAsync } from '~/utils/handlers'

const ordersRouter = Router()

//upload:
ordersRouter.post('/upload', wrapAsync(uploadController)) //readAll
ordersRouter.get('/all-orders', wrapAsync(getAllController))
ordersRouter.get('/get-order', wrapAsync(getByUserController))
ordersRouter.post('/delete', wrapAsync(deleteController))
ordersRouter.post('/status-order', accessTokenValidator, wrapAsync(updateStatusController))
export default ordersRouter
