import { Router } from 'express'
import { getAllController, uploadController } from '~/controllers/inputBills.controllers'
import { wrapAsync } from '~/utils/handlers'

const inputBillsRouter = Router()

//upload:
inputBillsRouter.post('/upload', wrapAsync(uploadController))
inputBillsRouter.get('/all-inputbills', wrapAsync(getAllController))
export default inputBillsRouter
