import { Router } from 'express'
import { uploadController } from '~/controllers/inputBills.controllers'
import { wrapAsync } from '~/utils/handlers'

const inputBillsRouter = Router()

//upload:
inputBillsRouter.post('/upload', wrapAsync(uploadController))

export default inputBillsRouter
