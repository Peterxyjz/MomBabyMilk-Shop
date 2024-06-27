import { Router } from 'express'
import {
    deleteController,
  getAllVoucherController,
  getVoucherController,
  getVoucherTypeController,
  updateController,
  uploadController
} from '~/controllers/vouchers.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'

import { wrapAsync } from '~/utils/handlers'

const voucherRouter = Router()

//upload:
voucherRouter.post('/upload', wrapAsync(uploadController)) //readAll

voucherRouter.get('/voucher/:id', wrapAsync(getVoucherController))

voucherRouter.get('/all-vouchers', wrapAsync(getAllVoucherController))

voucherRouter.get('/get-voucher-type', wrapAsync(getVoucherTypeController))

voucherRouter.post('/delete', accessTokenValidator, wrapAsync(deleteController))

voucherRouter.post('/update/:id', accessTokenValidator, wrapAsync(updateController))

export default voucherRouter
