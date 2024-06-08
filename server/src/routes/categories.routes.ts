import { Router } from 'express'
import {
  deleteController,
  getAllController,
  getController,
  updateController,
  uploadController
} from '~/controllers/categories.controllers'
import { categoryValidator, getCategoryValidator, updateCategoryValidator } from '~/middlewares/categories.middleware'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const categoriesRouter = Router()

//upload:
categoriesRouter.post('/upload', accessTokenValidator, categoryValidator, wrapAsync(uploadController)) //create
categoriesRouter.get('/all-categories', wrapAsync(getAllController)) //readAll
categoriesRouter.get('/category/:id', getCategoryValidator, wrapAsync(getController)) //readOne
categoriesRouter.patch('/category/:id', accessTokenValidator, updateCategoryValidator, wrapAsync(updateController)) //update
categoriesRouter.delete('/category/:id', accessTokenValidator, wrapAsync(deleteController)) //delete
export default categoriesRouter
