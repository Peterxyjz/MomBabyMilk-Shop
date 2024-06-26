import { Router } from 'express'
import { getAllController, updateController, uploadController } from '~/controllers/inputBills.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const inputBillsRouter = Router()

//upload:
inputBillsRouter.post('/upload', wrapAsync(uploadController))

inputBillsRouter.get('/all-inputbills', wrapAsync(getAllController))

inputBillsRouter.post('/update/:id', accessTokenValidator, wrapAsync(updateController))
export default inputBillsRouter
