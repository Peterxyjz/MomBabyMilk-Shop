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
body: {product }
*/
/**
 * @swagger
 * /products/upload:
 *   post:
 *     tags:
 *       - products
 *     summary: Thêm sản phẩm mới
 *     description: Uploads a new product with the provided details including brand, category, name, price, and other attributes.
 *     operationId: uploadProduct
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Product details to upload
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_id:
 *                 type: string
 *                 example: "6661fbc802a3c02580d9c00a"
 *               category_id:
 *                 type: string
 *                 example: "66600156c5477af75504134f"
 *               product_name:
 *                 type: string
 *                 example: "Sữa Ovaltine lúa mạch Hương Vị Socola 180ml"
 *               price:
 *                 type: number
 *                 example: 34000
 *               description:
 *                 type: string
 *                 example: "Sữa Ovaltine lúa mạch Hương Vị Socola 180ml cung cấp vitamin và khoáng chất..."
 *               age:
 *                 type: string
 *                 example: "Không dùng cho trẻ dưới 1 tuổi"
 *               discount:
 *                 type: string
 *                 example: "20"
 *             required:
 *               - brand_id
 *               - category_id
 *               - product_name
 *               - price
 *               - description
 *     responses:
 *       '200':
 *         description: Successful operation, product uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product uploaded successfully"
 *       '400':
 *         description: Bad request if required fields are missing or invalid
 *       '500':
 *         description: Internal server error
 */

productsRouter.post('/upload', accessTokenValidator, productValidator, wrapAsync(uploadController))

/*
des: không cần
path:/all-products
method: GET
*/

/**
 * @openapi
 * /products/all-products:
 *   get:
 *     tags:
 *       - products
 *     summary: Lấy tất cả sản phẩm
 *     description: Lấy tất cả sản phẩm
 *     operationId: getAllProducts
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lấy thành công
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 666868ec9610a540155120e0
 *                       brand_id:
 *                         type: string
 *                         example: 665ade9946daaa0a00f4d859
 *                       category_id:
 *                         type: string
 *                         example: 66600156c5477af75504134f
 *                       product_name:
 *                         type: string
 *                         example: Sữa Pha Sẵn GrowPlus+ Colos Immunel HG 180ml
 *                       price:
 *                         type: string
 *                         example: 80000
 *                       description:
 *                         type: string
 *                         example: Phong Siêu Đẹp Traii
 *                       age:
 *                         type: string
 *                         example: Không dùng cho trẻ dưới 1 tuổi
 *                       discount:
 *                         type: number
 *                         example: 10
 *                       img_url:
 *                         type: string
 *                         example: https://firebasestorage.googleapis.com/v0/b/mombabymilk-inventory.appspot.com/o/product_img%2Fdcd2e7f1-4f9f-4974-be50-f2fac887bbba?alt=media&token=04c6c8cd-5a92-49f7-90a6-2e01e5758330
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       brand_name:
 *                         type: string
 *                         example: Nutifood
 *                       category_name:
 *                         type: string
 *                         example: Sữa pha sẵn
 *                       amount:
 *                         type: number
 *                         example: 100
 *                       reviewer:
 *                         type: number
 *                         example: 4
 *                       rating:
 *                         type: number
 *                         example: 4.5
 *                       sales:
 *                         type: number
 *                         example: 11
 *       '422':
 *         description: Invalid
 */
productsRouter.get('/all-products', wrapAsync(getAllController))
/*
des: cung cấp id sản phẩm
path: /product/:id
method: GET
*/

/**
 * @swagger
 * /products/product/{id}:
 *   get:
 *     tags:
 *       - products
 *     summary: Lấy sản phẩm bằng Id
 *     description: Retrieves details of a specific product by its ID.
 *     operationId: getProductById
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           format: MongoId
 *           example: "666f16d382f5bceb1fe0d275"
 *     responses:
 *       '200':
 *         description: Successful operation, product details retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product details retrieved successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "666f16d382f5bceb1fe0d275"
 *                     brand_id:
 *                       type: string
 *                       example: "6661fbc802a3c02580d9c00a"
 *                     category_id:
 *                       type: string
 *                       example: "66600156c5477af75504134f"
 *                     product_name:
 *                       type: string
 *                       example: "Sữa Ovaltine lúa mạch Hương Vị Socola 180ml"
 *                     price:
 *                       type: number
 *                       example: 34000
 *                     description:
 *                       type: string
 *                       example: "Sữa Ovaltine lúa mạch Hương Vị Socola 180ml cung cấp vitamin và khoáng chất..."
 *                     age:
 *                       type: string
 *                       example: "Không dùng cho trẻ dưới 1 tuổi"
 *                     discount:
 *                       type: string
 *                       example: "20"
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
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
