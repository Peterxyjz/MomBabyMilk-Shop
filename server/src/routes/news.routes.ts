import { Router } from 'express'
import {
  deteleController,
  getAllController,
  getNewsByProIdController,
  getNewsController,
  updateNewsController,
  uploadController
} from '~/controllers/news.controllers'
import { updateNewsValidator, uploadNewsValidator } from '~/middlewares/news.middwares'
import { isParamsIdValidator } from '~/middlewares/products.middleware'
import { accessTokenValidator } from '~/middlewares/users.middlewares'

import { wrapAsync } from '~/utils/handlers'

const newsRouter = Router()

//upload:
/**
 * @swagger
 * /news/upload:
 *   post:
 *     tags:
 *       - news
 *     summary: Thêm news
 *     description: Thêm news.
 *     operationId: uploadNews
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Thêm news
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: 649f3f3f3f4e9d2b3c7b0e6d
 *               description:
 *                 type: string
 *                 example: New product launch in August
 *               news_name:
 *                 type: string
 *                 example: News News
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Bad request if required fields are missing or invalid
 *       '500':
 *         description: Internal server error
 */
newsRouter.post('/upload', accessTokenValidator, uploadNewsValidator, wrapAsync(uploadController))

/**
 * @swagger
 * /news/all-news:
 *   get:
 *     tags:
 *       - news
 *     summary: Lấy tất cả news 
 *     description: Lấy tất cả news 
 *     operationId: getAllNews
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
 *                   example: "Successfully retrieved all news"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "649f3f3f3f4e9d2b3c7b0e6f"
 *                       staff_id:
 *                         type: string
 *                         example: "649f3f3f3f4e9d2b3c7b0e6c"
 *                       product_id:
 *                         type: string
 *                         example: "649f3f3f3f4e9d2b3c7b0e6d"
 *                       description:
 *                         type: string
 *                         example: "New product launch in August"
 *                       img_url:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-12T17:09:05.773Z"
 *       '500':
 *         description: Internal server error
 */

newsRouter.get('/all-news', wrapAsync(getAllController))

/**
 * @swagger
 * /news/news/{id}:
 *   get:
 *     tags:
 *       - news
 *     summary: Lấy 1 news
 *     description: Lấy 1 news
 *     operationId: getNewsById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the news item to retrieve
 *         schema:
 *           type: string
 *           example: "649f3f3f3f4e9d2b3c7b0e6f"
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
 *                   example: "Successfully retrieved news item"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "649f3f3f3f4e9d2b3c7b0e6f"
 *                     staff_id:
 *                       type: string
 *                       example: "649f3f3f3f4e9d2b3c7b0e6c"
 *                     product_id:
 *                       type: string
 *                       example: "649f3f3f3f4e9d2b3c7b0e6d"
 *                     description:
 *                       type: string
 *                       example: "New product launch in August"
 *                     img_url:
 *                       type: string
 *                       example: "https://example.com/image.jpg"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-12T17:09:05.773Z"
 *       '404':
 *         description: News item not found
 *       '500':
 *         description: Internal server error
 */

newsRouter.get('/news/:id', isParamsIdValidator, wrapAsync(getNewsController))

/**
 * @swagger
 * /news/product/{id}:
 *   get:
 *     tags:
 *       - news
 *     summary: Lấy news bằng id sản phẩm
 *     description: Fetch news items associated with a particular product by its ID.
 *     operationId: getNewsByProductId
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to retrieve associated news
 *         schema:
 *           type: string
 *           example: "649f3f3f3f4e9d2b3c7b0e6d"
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
 *                   example: "Successfully retrieved news items for the product"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "649f3f3f3f4e9d2b3c7b0e6f"
 *                       staff_id:
 *                         type: string
 *                         example: "649f3f3f3f4e9d2b3c7b0e6c"
 *                       product_id:
 *                         type: string
 *                         example: "649f3f3f3f4e9d2b3c7b0e6d"
 *                       description:
 *                         type: string
 *                         example: "New product launch in August"
 *                       img_url:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-12T17:09:05.773Z"
 *       '404':
 *         description: No news items found for the given product ID
 *       '500':
 *         description: Internal server error
 */

newsRouter.get('/product/:id', isParamsIdValidator, wrapAsync(getNewsByProIdController))

/**
 * @swagger
 * /news/delete/{id}:
 *   delete:
 *     tags:
 *       - news
 *     summary: Xóa 1 news
 *     description: Remove a news item from the database by its ID.
 *     operationId: deleteNewsById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the news item to delete
 *         schema:
 *           type: string
 *           example: "649f3f3f3f4e9d2b3c7b0e6f"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully deleted the news item
 *       '404':
 *         description: News item not found
 *       '500':
 *         description: Internal server error
 */
newsRouter.delete('/delete/:id', accessTokenValidator, isParamsIdValidator, wrapAsync(deteleController))

/**
 * @swagger
 * /news/update/{id}:
 *   patch:
 *     tags:
 *       - news
 *     summary: Update a specific news item
 *     description: Update the details of a news item by its ID.
 *     operationId: updateNewsById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the news item to update
 *         schema:
 *           type: string
 *           example: "649f3f3f3f4e9d2b3c7b0e6f"
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: The news item details to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               news_name:
 *                 type: string
 *                 example: "Product Launch Event"
 *               product_id:
 *                 type: string
 *                 example: "649f3f3f3f4e9d2b3c7b0e6d"
 *               description:
 *                 type: string
 *                 example: "Exciting news about the new product launch!"
 *               img_url:
 *                 type: string
 *                 example: "https://example.com/new_product_image.jpg"
 *     responses:
 *       '200':
 *         description: Successfully updated the news item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully updated the news item"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "649f3f3f3f4e9d2b3c7b0e6f"
 *                     news_name:
 *                       type: string
 *                       example: "Product Launch Event"
 *                     product_id:
 *                       type: string
 *                       example: "649f3f3f3f4e9d2b3c7b0e6d"
 *                     description:
 *                       type: string
 *                       example: "Exciting news about the new product launch!"
 *                     img_url:
 *                       type: string
 *                       example: "https://example.com/new_product_image.jpg"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-12T17:09:05.773Z"
 *       '400':
 *         description: Invalid ID or request body
 *       '404':
 *         description: News item not found
 *       '500':
 *         description: Internal 
*/

newsRouter.patch(
  '/update/:id',
  accessTokenValidator,
  isParamsIdValidator,
  updateNewsValidator,
  wrapAsync(updateNewsController)
)
export default newsRouter
