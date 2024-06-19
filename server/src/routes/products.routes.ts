import { Router } from 'express'
import {
  getAllController,
  getController,
  getProductPageController,
  notActiveController,
  updateController,
  uploadController
} from '~/controllers/products.controllers'
import { isParamsIdValidator, productValidator, updateProductValidator } from '~/middlewares/products.middleware'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const productsRouter = Router()
/*
des: cung cấp thông tin sản phẩm, accesstoken 
path: /upload
method: POST
Header:  {Authorization: Bearer <access_token>}
body: {product, }
*/
productsRouter.post('/upload', accessTokenValidator, productValidator, wrapAsync(uploadController))

/*
des: không cần
path:/all-products
method: GET
*/
productsRouter.get('/all-products', wrapAsync(getAllController))
productsRouter.get('/all-products-page', wrapAsync(getProductPageController))
/*
des: cung cấp id sản phẩm
path: /product/:id
method: GET
*/
productsRouter.get('/product/:id', isParamsIdValidator, wrapAsync(getController))

/*
des: cung cấp thông tin sản phẩm, accesstoken 
path: /product/:id
method: PATCH
Header:  {Authorization: Bearer <access_token>}
body: {product }
*/
productsRouter.patch(
  '/product/:id',
  accessTokenValidator,
  isParamsIdValidator,
  updateProductValidator,
  wrapAsync(updateController)
)

/*
des: cung cấp thông tin sản phẩm, accesstoken 
path: /product/:id
method: PATCH
Header:  {Authorization: Bearer <access_token>}
body: {product }
*/
productsRouter.patch('/product/:id', accessTokenValidator, isParamsIdValidator, wrapAsync(notActiveController))

export default productsRouter
