import { Router } from 'express'
import {
  getAllController,
  getController,
  notActiveController,
  updateController,
  uploadController
} from '~/controllers/products.controllers'
import { getProductValidator, productValidator, updateProductValidator } from '~/middlewares/products.middleware'
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
productsRouter.post('/update', updateProductValidator, wrapAsync(updateController))
/*
des: không cần
path:/all-products
method: GET
*/
productsRouter.get('/all-products', wrapAsync(getAllController))

/*
des: cung cấp id sản phẩm
path: /product/:id
method: GET
*/
productsRouter.get('/product/:id', getProductValidator, wrapAsync(getController))

/*
des: cung cấp thông tin sản phẩm, accesstoken 
path: /product/:id
method: PATCH
Header:  {Authorization: Bearer <access_token>}
body: {product }
*/
productsRouter.patch('/product/:id', accessTokenValidator, updateProductValidator, wrapAsync(updateController))

/*
des: cung cấp thông tin sản phẩm, accesstoken 
path: /product/:id
method: PATCH
Header:  {Authorization: Bearer <access_token>}
body: {product }
*/
productsRouter.patch('/product/:id', accessTokenValidator, wrapAsync(notActiveController))

export default productsRouter
