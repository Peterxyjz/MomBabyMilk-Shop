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
/**
 * @swagger
 * /categories/upload:
 *   post:
 *     tags:
 *       - categories
 *     summary: Upload Loại sản phẩm
 *     description: Upload Loại sản phẩm
 *     operationId: uploadCategories
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Upload thuong hiệu
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 example: Thuong Hieu
 *               description:
 *                 type: string
 *                 example: Thuong Hieu
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '422':
 *         description: Invalid email/password supplied
 */

categoriesRouter.post('/upload', accessTokenValidator, categoryValidator, wrapAsync(uploadController)) //create

/**
 * @swagger
 * /categories/all-categories:
 *   get:
 *     tags:
 *       - categories
 *     summary: Lấy tất cả loại sản phẩm
 *     description: Lấy tất cả loại sản phẩm
 *     operationId: getAllCategories
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
 *                       category_name:
 *                         type: string
 *                         example: Thuong Hieu
 *                       description:
 *                         type: string
 *                         example: Thuong Hieu
 *       '500':
 *         description: Internal server error
 */
categoriesRouter.get('/all-categories', wrapAsync(getAllController)) //readAll

/**
 * @swagger
 * /categories/category/{id}:
 *   get:
 *     tags:
 *       - categories
 *     summary: Lấy thông tin loại sản phẩm
 *     description: Lấy thông tin loại sản phẩm theo ID
 *     operationId: getCategoryById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của loại sản phẩm
 *         schema:
 *           type: string
 *           format: MongoId
 *           example: 665ada275c99a85ebe472888
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
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 665ade9946daaa0a00f4d859
 *                     category_name:
 *                       type: string
 *                       example: Thuong Hieu
 *                     description:
 *                       type: string
 *                       example: Thuong Hieu
 *       '500':
 *         description: Internal server error
 */

categoriesRouter.get('/category/:id', getCategoryValidator, wrapAsync(getController)) //readOne

/**
 * @swagger
 * /categories/category/{id}:
 *   patch:
 *     tags:
 *       - categories
 *     summary: Cập nhật loại sản phẩm
 *     description: Cập nhật loại sản phẩm theo ID
 *     operationId: updateCategory
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của loại sản phẩm
 *         schema:
 *           type: string
 *           format: MongoId
 *           example: 665ada275c99a85ebe472888
 *     requestBody:
 *       description: Thông tin cần cập nhật của loại sản phẩm
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 example: Thuong Hieu
 *               description:
 *                 type: string
 *                 example: Thuong Hieu
 *     security:
 *       - BearerAuth: []
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
 *                     category_name:
 *                       type: string
 *                       example: Thuong Hieu
 *                     description:
 *                       type: string
 *                       example: Thuong Hieu
 *       '500':
 *         description: Internal server error
 */
categoriesRouter.patch('/category/:id', accessTokenValidator, updateCategoryValidator, wrapAsync(updateController)) //update

/**
 * @swagger
 * /categories/category/{id}:
 *   delete:
 *     tags:
 *       - categories
 *     summary: Xóa loại sản phẩm
 *     description: Xóa loại sản phẩm theo ID
 *     operationId: deleteCategory
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của loại sản phẩm
 *         schema:
 *           type: string
 *           format: MongoId
 *           example: 665ada275c99a85ebe472888
 *     security:
 *       - BearerAuth: [] 
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
categoriesRouter.delete('/category/:id', accessTokenValidator, wrapAsync(deleteController)) //delete
export default categoriesRouter
