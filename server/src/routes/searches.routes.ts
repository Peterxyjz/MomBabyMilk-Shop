import { Router } from 'express'
import { getProductsController } from '~/controllers/searches.controller'

import { wrapAsync } from '~/utils/handlers'

const searchRouter = Router()

//upload:
searchRouter.post('/product-name', wrapAsync(getProductsController)) //readAll

export default searchRouter
