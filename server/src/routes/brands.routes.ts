import { Router } from 'express'
import {
  uploadController,
  deleteController,
  getAllController,
  getController,
  updateController
} from '~/controllers/brands.controllers'
import { brandsValidator, getBrandValidator, updateBrandsValidator } from '~/middlewares/brands.middleware'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const brandsRouter = Router()

//upload:

brandsRouter.post('/upload', accessTokenValidator, brandsValidator, wrapAsync(uploadController))
brandsRouter.get('/all-brands', wrapAsync(getAllController)) //readAll
brandsRouter.get('/brand/:id', getBrandValidator, wrapAsync(getController)) //readOne
brandsRouter.patch('/brand/:id', accessTokenValidator, updateBrandsValidator, wrapAsync(updateController)) //update
brandsRouter.delete('/brand/:id', accessTokenValidator, wrapAsync(deleteController)) //delete
export default brandsRouter
