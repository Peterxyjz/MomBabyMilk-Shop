import { Router } from 'express'
import {
  deteleFeebBackController,
  getAllController,
  getFeedbackByProIdController,
  getFeedBackByUserIdController,
  replyUploadController,
  updateFeedBackController,
  updateReplyFeedBackController,
  uploadController
} from '~/controllers/feedbacks.controllers'
import { updateController } from '~/controllers/products.controllers'
import { updateFeedBackValidator, updateReplyFeedBackValidator } from '~/middlewares/feedbacks.middwares'
import { isParamsIdValidator } from '~/middlewares/products.middleware'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const feedbacksRouter = Router()

//upload:
/**
 * @swagger
 * /feedbacks/feedback/upload:
 *   post:
 *     tags:
 *       - feedbacks
 *     summary: Upload Feedback
 *     description: Upload Feedback
 *     operationId: uploadFeedback
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Upload Feedback
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: 665ade9946daaa0a00f4d859
 *               description:
 *                 type: string
 *                 example: Thuong Hieu
 *               rating:
 *                 type: number
 *                 example: 5
 *               user_id:
 *                 type: string
 *                 example: 665ade9946daaa0a00f4d859
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '422':
 *         description: Invalid email/password supplied
 */
feedbacksRouter.post('/feedback/upload', accessTokenValidator, wrapAsync(uploadController))

/**
 * @swagger
 * /feedbacks/reply/upload:
 *   post:
 *     tags:
 *       - feedbacks
 *     summary: Upload Reply Feedback
 *     description: Upload Reply Feedback
 *     operationId: uploadReplyFeedback
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Upload Reply Feedback
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedback_id:
 *                 type: string
 *                 example: 665ade9946daaa0a00f4d859
 *               description:
 *                 type: string
 *                 example: Cảm ơn bạn đã phản hồi
 *               user_id:
 *                 type: string
 *                 example: 665ade9946daaa0a00f4d859
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '422':
 *         description: Invalid email/password supplied
 */
feedbacksRouter.post('/reply/upload', accessTokenValidator, wrapAsync(replyUploadController))

/**
 * @swagger
 * /feedbacks/all-feedback:
 *   get:
 *     tags:
 *       - feedbacks
 *     summary: Lấy tất cả phản hồi
 *     description: Lấy tất cả phản hồi
 *     operationId: getAllFeedback
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
 *                         example: 66916331d24196dd806eaae5
 *                       product_id:
 *                         type: string
 *                         example: 6690c8cbdd873cf9716c445c
 *                       description:
 *                         type: string
 *                         example: Dễ ăn lắm
 *                       rating:
 *                         type: number
 *                         example: 5
 *                       user_id:
 *                         type: string
 *                         example: 669143b8d24196dd806eaa85
 *                       created_at:
 *                         type: string
 *                         example: 2024-07-12T17:09:05.773Z
 *                       reply_feedback:
 *                         type: string
 *                         example: null
 *       '500':
 *         description: Internal server error
 */
feedbacksRouter.get('/all-feedback', wrapAsync(getAllController))

/**
 * @swagger
 * /feedbacks/feedback/delete/{id}:
 *   delete:
 *     tags:
 *       - feedbacks
 *     summary: Xóa phản hồi
 *     description: Xóa phản hồi theo ID
 *     operationId: deleteFeedback
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của phản hồi
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
feedbacksRouter.delete(
  '/feedback/delete/:id',
  accessTokenValidator,
  isParamsIdValidator,
  wrapAsync(deteleFeebBackController)
)

/**
 * @swagger
 * /feedbacks/reply/delete/{id}:
 *   delete:
 *     tags:
 *       - feedbacks
 *     summary: Xóa phản hồi trả lời
 *     description: Xóa phản hồi trả lời theo ID
 *     operationId: deleteReplyFeedback
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của phản hồi trả lời
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
 *                   example: Xóa thành công
 *       '500':
 *         description: Internal server error
 */
feedbacksRouter.delete(
  '/reply/delete/:id',
  accessTokenValidator,
  isParamsIdValidator,
  wrapAsync(deteleFeebBackController)
)
/**
 * @swagger
 * /feedbacks/feedback/{id}:
 *   post:
 *     tags:
 *       - feedbacks
 *     summary: Cập nhật phản hồi
 *     description: Cập nhật phản hồi
 *     operationId: updateFeedback
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: string
 *           format: MongoId
 *           example: 6690c8cbdd873cf9716c445c
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Thông tin phản hồi
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Sản phẩm rất tốt
 *               rating:
 *                 type: number
 *                 example: 5
 *               user_id:
 *                 type: string
 *                 example: 669143b8d24196dd806eaa85
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
 *                   example: Phản hồi đã được tạo
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66916331d24196dd806eaae5
 *                     product_id:
 *                       type: string
 *                       example: 6690c8cbdd873cf9716c445c
 *                     description:
 *                       type: string
 *                       example: Sản phẩm rất tốt
 *                     rating:
 *                       type: number
 *                       example: 5
 *                     user_id:
 *                       type: string
 *                       example: 669143b8d24196dd806eaa85
 *                     created_at:
 *                       type: string
 *                       example: 2024-07-12T17:09:05.773Z
 *                     reply_feedback:
 *                       type: string
 *                       example: null
 *       '422':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
feedbacksRouter.post(
  '/feedback/:id',
  accessTokenValidator,
  isParamsIdValidator,
  updateFeedBackValidator,
  wrapAsync(updateFeedBackController)
)
/**
 * @swagger
 * /feedbacks/reply/{id}:
 *   patch:
 *     tags:
 *       - feedbacks
 *     summary: Cập nhật phản hồi trả lời
 *     description: Cập nhật phản hồi trả lời theo ID
 *     operationId: updateReplyFeedback
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của phản hồi trả lời
 *         schema:
 *           type: string
 *           format: MongoId
 *           example: 665ada275c99a85ebe472888
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Thông tin phản hồi trả lời cần cập nhật
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: 6690c8cbdd873cf9716c445c
 *               description:
 *                 type: string
 *                 example: Cảm ơn bạn đã phản hồi
 *               user_id:
 *                 type: string
 *                 example: 669143b8d24196dd806eaa85
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-07-12T17:09:05.773Z

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
 *                   example: Cập nhật phản hồi trả lời thành công
 *                 result:
 *                   type: object
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       example: true
 *                     modifiedCount:
 *                       type: number
 *                       example: 1
 *                     upsertedId:
 *                       type: string
 *                       example: null
 *                     upsertedCount:
 *                       type: number
 *                       example: 0
 *                     matchedCount:
 *                       type: number
 *                       example: 1
 *       '422':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
feedbacksRouter.post(
  '/reply/:id',
  accessTokenValidator,
  isParamsIdValidator,
  updateReplyFeedBackValidator,
  wrapAsync(updateReplyFeedBackController)
)
/**
 * @swagger
 * /feedbacks/product/{id}:
 *   get:
 *     tags:
 *       - feedbacks
 *     summary: Lấy phản hồi của sản phẩm
 *     description: Lấy phản hồi liên quan đến sản phẩm theo ID
 *     operationId: getFeedbacksByProductId
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: string
 *           format: MongoId
 *           example: 6690c8cbdd873cf9716c445c
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
 *                   example: Lấy phản hồi thành công
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66916331d24196dd806eaae5
 *                       product_id:
 *                         type: string
 *                         example: 6690c8cbdd873cf9716c445c
 *                       description:
 *                         type: string
 *                         example: Sản phẩm rất tốt
 *                       rating:
 *                         type: number
 *                         example: 5
 *                       user_id:
 *                         type: string
 *                         example: 669143b8d24196dd806eaa85
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-07-12T17:09:05.773Z
 *                       reply_feedback:
 *                         type: string
 *                         example: null
 *       '500':
 *         description: Internal server error
 */
feedbacksRouter.get('/product/:id', isParamsIdValidator, wrapAsync(getFeedbackByProIdController))
//getFeedBackByUserId
/**
 * @swagger
 * /feedbacks/user/{id}:
 *   get:
 *     tags:
 *       - feedbacks
 *     summary: Lấy tất cả phản hồi của người dùng
 *     description: Lấy tất cả phản hồi liên quan đến người dùng theo ID
 *     operationId: getFeedbacksByUserId
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           format: MongoId
 *           example: 669143b8d24196dd806eaa85
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
 *                   example: Lấy phản hồi thành công
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66916331d24196dd806eaae5
 *                       product_id:
 *                         type: string
 *                         example: 6690c8cbdd873cf9716c445c
 *                       description:
 *                         type: string
 *                         example: Sản phẩm rất tốt
 *                       rating:
 *                         type: number
 *                         example: 5
 *                       user_id:
 *                         type: string
 *                         example: 669143b8d24196dd806eaa85
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-07-12T17:09:05.773Z
 *                       reply_feedback:
 *                         type: string
 *                         example: null
 *       '500':
 *         description: Internal server error
 */
feedbacksRouter.get('/user/:id', isParamsIdValidator, wrapAsync(getFeedBackByUserIdController))
export default feedbacksRouter
