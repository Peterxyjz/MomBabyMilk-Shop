import { Router } from 'express'
import { getAllController, updateController, uploadController } from '~/controllers/inputBills.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const inputBillsRouter = Router()

//upload:
/**
 * @swagger
 * /input-bills:
 *   post:
 *     tags:
 *       - inputBills
 *     summary: Tạo hóa đơn đầu vào
 *     description: Tạo hóa đơn đầu vào mới với ngày nhập, chi tiết hóa đơn và tổng tiền.
 *     operationId: createInputBill
 *     requestBody:
 *       description: Thông tin hóa đơn đầu vào
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-07-12T17:09:05.773Z
 *               inputBillDetailList:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       example: 6690c8cbdd873cf9716c445c
 *                     amount:
 *                       type: number
 *                       example: 10
 *               total:
 *                 type: number
 *                 example: 150000
 *     responses:
 *       '201':
 *         description: Hóa đơn đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn đã được tạo thành công
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66916331d24196dd806eaae5
 *                     input_date:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-07-12T17:09:05.773Z
 *                     inputBillDetailList:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product_id:
 *                             type: string
 *                             example: 6690c8cbdd873cf9716c445c
 *                           amount:
 *                             type: number
 *                             example: 10
 *                     total:
 *                       type: number
 *                       example: 150000
 *       '400':
 *         description: Request invalid or missing required fields
 *       '500':
 *         description: Internal server error
 */

inputBillsRouter.post('/upload', wrapAsync(uploadController))

/**
 * @swagger
 * /inputBills/all-inputbills:
 *   get:
 *     tags:
 *       - inputBills
 *     summary: Lấy tất cả hóa đơn đầu vào
 *     description: Lấy tất cả hóa đơn đầu vào từ cơ sở dữ liệu.
 *     operationId: getAllInputBills
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
 *                   example: Lấy hóa đơn thành công
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66916331d24196dd806eaae5
 *                       input_date:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-07-12T17:09:05.773Z
 *                       inputBillDetailList:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product_id:
 *                               type: string
 *                               example: 6690c8cbdd873cf9716c445c
 *                             amount:
 *                               type: number
 *                               example: 10
 *                       total:
 *                         type: number
 *                         example: 150000
 *       '500':
 *         description: Internal server error
 */

inputBillsRouter.get('/all-inputbills', wrapAsync(getAllController))

inputBillsRouter.post('/update/:id', accessTokenValidator, wrapAsync(updateController))
export default inputBillsRouter
