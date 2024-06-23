import { Router } from 'express'
import { getAllVoucherController, getVoucherController, uploadController } from '~/controllers/vouchers.controllers'


import { wrapAsync } from '~/utils/handlers'

const voucherRouter = Router()

//upload:
voucherRouter.post('/upload', wrapAsync(uploadController)) //readAll

voucherRouter.get('/voucher/:id', wrapAsync(getVoucherController))

voucherRouter.get('/all-vouchers', wrapAsync(getAllVoucherController))

export default voucherRouter
