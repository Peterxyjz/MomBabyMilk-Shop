import { Router } from 'express'
import {
  getAllController,
  getController,
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
/*
des: cung cấp id sản phẩm
path: /product/:id
method: GET
*/
productsRouter.get('/product/:id', isParamsIdValidator, wrapAsync(getController))

/**
 * @openapi
 * /products/product/{id}:
 *   patch:
 *     tags:
 *       - products
 *     summary: Cập nhật sản phẩm
 *     description: Cập nhật sản phẩm
 *     operationId: patchProduct
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của sản phẩm
 *         required: true
 *         schema:
 *           type: string
 *           format: MongoId
 *           example: 666868ec9610a540155120e0
 *     requestBody:
 *       description: Thông tin cập nhật
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_id: 
 *                 type: string
 *                 example: 665ade9946daaa0a00f4d859
 *               category_id: 
 *                 type: string
 *                 example: 66600156c5477af75504134f
 *               product_name:
 *                 type: string
 *                 example: Sữa Pha Sẵn GrowPlus+ Colos Immunel HG 180ml
 *               price:
 *                 type: string
 *                 example: 80000
 *               description:
 *                 type: string
 *                 example: Phong Siêu Đẹp Traii
 *               age:
 *                 type: string
 *                 example: Không dùng cho trẻ dưới 1 tuổi
 *               discount:
 *                 type: number
 *                 example: 10
 *               img_url:
 *                 type: string
 *                 example: https://firebasestorage.googleapis.com/v0/b/mombabymilk-inventory.appspot.com/o/product_img%2Fdcd2e7f1-4f9f-4974-be50-f2fac887bbba?alt=media&token=04c6c8cd-5a92-49f7-90a6-2e01e5758330
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '422':
 *         description: Invalid email/password supplied
 *       
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
