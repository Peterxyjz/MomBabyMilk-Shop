import { Router } from 'express'
import { deleteController, getAllController, uploadController } from '~/controllers/orders.controllers'

import { wrapAsync } from '~/utils/handlers'

const ordersRouter = Router()

//upload:
ordersRouter.post('/upload', wrapAsync(uploadController)) //readAll
ordersRouter.get('/all-orders', wrapAsync(getAllController))
ordersRouter.post('/delete', wrapAsync(deleteController))
export default ordersRouter
