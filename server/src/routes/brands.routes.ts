import { Router } from 'express'
import {
  uploadController,
  deleteController,
  getAllController,
  getController,
  updateController
} from '~/controllers/brands.controllers'
import { brandsValidator, getBrandValidator, updateBrandsValidator } from '~/middlewares/brands.middleware'
import { isParamsIdValidator } from '~/middlewares/products.middleware'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const brandsRouter = Router()

//upload:
/**
 * @openapi
 * /brands/upload:
 *   post:
 *     tags:
 *       - brands
 *     summary: Upload thương hiệu
 *     description: Upload thương hiệu
 *     operationId: uploadBrands
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Upload thương hiệu
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *                 example: Nutifood
 *               address:
 *                 type: string
 *                 example: Hanoi
 *               country:
 *                 type: string
 *                 example: Vietnam
 *               phone:
 *                 type: string
 *                 example: 0987654321
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '422':
 *         description: Invalid email/password supplied
 */
brandsRouter.post('/upload', accessTokenValidator, brandsValidator, wrapAsync(uploadController))

/**
 * @swagger
 * /brands/all-brands:
 *   get:
 *     tags:
 *       - brands
 *     summary: Lấy tất cả thương hiệu
 *     description: Lấy tất cả thương hiệu
 *     operationId: getAllBrands
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
 *                         example: 665ade9946daaa0a00f4d859
 *                       brand_name:
 *                         type: string
 *                         example: Nutifood
 *                       address:
 *                         type: string
 *                         example: Hanoi
 *                       country:
 *                         type: string
 *                         example: Vietnam
 *                       phone:
 *                         type: string
 *                         example: 0987654321
 *       '500':
 *         description: Internal server error
 */
brandsRouter.get('/all-brands', wrapAsync(getAllController)) //readAll

/**
 * @swagger
 * /brands/brand/{id}:
 *   get:
 *     tags:
 *       - brands
 *     summary: Lọc thương hiệu
 *     description: Lọc thương hiệu
 *     operationId: getBrand
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của thương hiệu
 *         schema:
 *           type: string
 *           example: 6661fbdf02a3c02580d9c00b
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
 *                   example: Lọc thương hiệu
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 665ade9946daaa0a00f4d859
 *                     brand_name:
 *                       type: string
 *                       example: Nutifood
 *                     address:
 *                       type: string
 *                       example: Hanoi
 *                     country:
 *                       type: string
 *                       example: Vietnam
 *                     phone:
 *                       type: string
 *                       example: 0987654321
 *       '500':
 *         description: Internal server error
 */
brandsRouter.get('/brand/:id', isParamsIdValidator, wrapAsync(getController)) //readOne

/**
 * @swagger
 * /brands/brand/{id}:
 *   patch:
 *     tags:
 *       - brands
 *     summary: Cập nhật thương hiệu
 *     description: Cập nhật thương hiệu
 *     operationId: updateBrand
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của thương hiệu
 *         schema:
 *           type: string
 *           format: MongoId
 *           example: 6661fbdf02a3c02580d9c00b 
 *     requestBody:
 *       description: Thông tin cần cập nhật của thương hiệu
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *                 example: BIMBOSAN
 *               address:
 *                 type: string
 *                 example: Churerstrasse 20, 9470 Buchs, Switzerland
 *               country:
 *                 type: string
 *                 example: Switzerland
 *               phone:
 *                 type: string
 *                 example: 0987654321
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
 *                   example: Cập nhật thành công
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 665ade9946daaa0a00f4d859
 *                     brand_name:
 *                       type: string
 *                       example: Nutifood
 *                     address:
 *                       type: string
 *                       example: Hanoi
 *                     country:
 *                       type: string
 *                       example: Vietnam
 *                     phone:
 *                       type: string
 *                       example: 0987654321
 *       '500':
 *         description: Internal server error
 */
brandsRouter.patch('/brand/:id', accessTokenValidator, updateBrandsValidator, wrapAsync(updateController)) //update

/**
 * @swagger
 * /brands/brand/{id}:
 *   delete:
 *     tags:
 *       - brands
 *     summary: Xóa thương hiệu
 *     description: Xóa thương hiệu
 *     operationId: deleteBrand
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của thương hiệu
 *         schema:
 *           type: string
 *           format: MongoId  
 *           example: 6661fbdf02a3c02580d9c00b
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
 *                   example: Xóa thành công
 *       '500':
 *         description: Internal server error
 */
brandsRouter.delete('/brand/:id', accessTokenValidator, wrapAsync(deleteController)) //delete
export default brandsRouter
