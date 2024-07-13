import { Router } from 'express'
import {
  deleteController,
  getAllVoucherController,
  getVoucherController,
  getVoucherTypeController,
  updateController,
  uploadController
} from '~/controllers/vouchers.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'

import { wrapAsync } from '~/utils/handlers'

const voucherRouter = Router()

//upload:
/**
 * @swagger
 * /vouchers/upload:
 *   post:
 *     tags:
 *       - vouchers
 *     summary: Thêm voucher
 *     description: Allows users to create and upload a new voucher.
 *     operationId: uploadVoucher
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Voucher details to be uploaded
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               voucher_type:
 *                 type: number
 *                 example: 0
 *               membership:
 *                 type: number
 *                 description: Membership discount amount (applicable if voucher_type is "User")
 *                 example: 100
 *               expire_date:
 *                 type: string
 *                 format: date
 *                 description: Expiry date of the voucher
 *                 example: "2024-04-12T14:56:23.362+00:00"
 *               discount:
 *                 type: number
 *                 description: Discount amount or percentage provided by the voucher
 *                 example: 20
 *               amount:
 *                 type: integer
 *                 description: The total number of vouchers available
 *                 example: 100
 *     responses:
 *       '201':
 *         description: Voucher successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Voucher created successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the voucher
 *                       example: "60c72b2f4f1c2b001c8e4d5e"
 *                     voucher_type:
 *                       type: string
 *                       description: Type of the voucher
 *                       example: "User"
 *                     membership:
 *                       type: number
 *                       description: Membership discount amount
 *                       example: 100
 *                     expire_date:
 *                       type: string
 *                       format: date
 *                       description: Expiry date of the voucher
 *                       example: "2024-12-31"
 *                     discount:
 *                       type: number
 *                       description: Discount amount or percentage
 *                       example: 20
 *                     amount:
 *                       type: integer
 *                       description: Total number of vouchers
 *                       example: 100
 *       '400':
 *         description: Bad request, invalid input
 *       '500':
 *         description: Internal server error
 */

voucherRouter.post('/upload', wrapAsync(uploadController)) //readAll

/**
 * @swagger
 * /vouchers/voucher/{id}:
 *   get:
 *     tags:
 *       - vouchers
 *     summary: Lấy voucher bằng id
 *     description: Fetch details of a specific voucher using its unique identifier.
 *     operationId: getVoucherById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the voucher
 *           example: "669251bb5008c81cead0591d"
 *     responses:
 *       '200':
 *         description: Voucher successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier for the voucher
 *                   example: "60c72b2f4f1c2b001c8e4d5e"
 *                 voucher_type:
 *                   type: string
 *                   description: Type of the voucher (e.g., "User", "Discount")
 *                   example: "User"
 *                 membership:
 *                   type: number
 *                   description: Membership discount amount (applicable if voucher_type is "User")
 *                   example: 100
 *                 expire_date:
 *                   type: string
 *                   format: date
 *                   description: Expiry date of the voucher
 *                   example: "2024-12-31"
 *                 discount:
 *                   type: number
 *                   description: Discount amount or percentage provided by the voucher
 *                   example: 20
 *                 amount:
 *                   type: integer
 *                   description: The total number of vouchers available
 *                   example: 100
 *       '404':
 *         description: Voucher not found with the specified ID
 *       '500':
 *         description: Internal server error
 */

voucherRouter.get('/voucher/:id', wrapAsync(getVoucherController))

/**
 * @swagger
 * /vouchers/all-vouchers:
 *   get:
 *     tags:
 *       - vouchers
 *     summary: Lấy tất cả voucher 
 *     description: Fetch details of a specific voucher using its unique identifier.
 *     operationId: getaLLVoucher
 *     responses:
 *       '200':
 *         description: Voucher successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier for the voucher
 *                   example: "60c72b2f4f1c2b001c8e4d5e"
 *                 voucher_type:
 *                   type: string
 *                   description: Type of the voucher (e.g., "User", "Discount")
 *                   example: "User"
 *                 membership:
 *                   type: number
 *                   description: Membership discount amount (applicable if voucher_type is "User")
 *                   example: 100
 *                 expire_date:
 *                   type: string
 *                   format: date
 *                   description: Expiry date of the voucher
 *                   example: "2024-12-31"
 *                 discount:
 *                   type: number
 *                   description: Discount amount or percentage provided by the voucher
 *                   example: 20
 *                 amount:
 *                   type: integer
 *                   description: The total number of vouchers available
 *                   example: 100
 *       '404':
 *         description: Voucher not found with the specified ID
 *       '500':
 *         description: Internal server error
 */
voucherRouter.get('/all-vouchers', wrapAsync(getAllVoucherController))

/**
 * @swagger
 * /vouchers/get-voucher-type:
 *   get:
 *     tags:
 *       - vouchers
 *     summary: Lấy các loại voucher
 *     description: Fetch details of a specific voucher using its unique identifier.
 *     operationId: gettypeaLLVoucher
 *     responses:
 *       '200':
 *         description: Voucher successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier for the voucher
 *                   example: "60c72b2f4f1c2b001c8e4d5e"
 *                 voucher_type:
 *                   type: string
 *                   description: Type of the voucher (e.g., "User", "Discount")
 *                   example: "User"
 *                 membership:
 *                   type: number
 *                   description: Membership discount amount (applicable if voucher_type is "User")
 *                   example: 100
 *                 expire_date:
 *                   type: string
 *                   format: date
 *                   description: Expiry date of the voucher
 *                   example: "2024-12-31"
 *                 discount:
 *                   type: number
 *                   description: Discount amount or percentage provided by the voucher
 *                   example: 20
 *                 amount:
 *                   type: integer
 *                   description: The total number of vouchers available
 *                   example: 100
 *       '404':
 *         description: Voucher not found with the specified ID
 *       '500':
 *         description: Internal server error
 */
voucherRouter.get('/get-voucher-type', wrapAsync(getVoucherTypeController))

/**
 * @swagger
 * /vouchers/delete:
 *   post:
 *     tags:
 *       - vouchers
 *     summary: Xóa voucher bằng Id
 *     description: Fetch details of a specific voucher using its unique identifier.
 *     operationId: deleteVoucherById
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The unique identifier of the voucher
 *                 example: "60c72b2f4f1c2b001c8e4d5e"
 *     responses:
 *       '200':
 *         description: Voucher successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier for the voucher
 *                   example: "60c72b2f4f1c2b001c8e4d5e"
 *                 voucher_type:
 *                   type: string
 *                   description: Type of the voucher (e.g., "User", "Discount")
 *                   example: "User"
 *                 membership:
 *                   type: number
 *                   description: Membership discount amount (applicable if voucher_type is "User")
 *                   example: 100
 *                 expire_date:
 *                   type: string
 *                   format: date
 *                   description: Expiry date of the voucher
 *                   example: "2024-12-31"
 *                 discount:
 *                   type: number
 *                   description: Discount amount or percentage provided by the voucher
 *                   example: 20
 *                 amount:
 *                   type: integer
 *                   description: The total number of vouchers available
 *                   example: 100
 *       '404':
 *         description: Voucher not found with the specified ID
 *       '500':
 *         description: Internal server error
 */
voucherRouter.post('/delete', accessTokenValidator, wrapAsync(deleteController))

/**
 * @swagger
 * /vouchers/update/{id}:
 *   post:
 *     tags:
 *       - vouchers
 *     summary: Cập nhật voucher bằng Id
 *     description: Modify the details of an existing voucher using its unique identifier.
 *     operationId: updateVoucherById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the voucher to update
 *           example: "60c72b2f4f1c2b001c8e4d5e"
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Details of the voucher to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               voucher_type:
 *                 type: number
 *                 example: 0
 *               membership:
 *                 type: number
 *                 description: Membership discount amount (applicable if voucher_type is "User")
 *                 example: 100
 *               expire_date:
 *                 type: string
 *                 format: date
 *                 description: Expiry date of the voucher
 *                 example: "2024-04-12T14:56:23.362+00:00"
 *               discount:
 *                 type: number
 *                 description: Discount amount or percentage provided by the voucher
 *                 example: 20
 *               amount:
 *                 type: integer
 *                 description: The total number of vouchers available
 *                 example: 100
 *             required:
 *               - voucher_type
 *               - expire_date
 *               - discount
 *     responses:
 *       '200':
 *         description: Voucher successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Voucher updated successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the voucher
 *                       example: "60c72b2f4f1c2b001c8e4d5e"
 *                     voucher_type:
 *                       type: string
 *                       description: Type of the voucher
 *                       example: "User"
 *                     membership:
 *                       type: number
 *                       description: Membership discount amount
 *                       example: 100
 *                     expire_date:
 *                       type: string
 *                       format: date
 *                       description: Expiry date of the voucher
 *                       example: "2024-12-31"
 *                     discount:
 *                       type: number
 *                       description: Discount amount or percentage
 *                       example: 20
 *                     amount:
 *                       type: integer
 *                       description: The total number of vouchers available
 *                       example: 100
 *       '400':
 *         description: Bad request, invalid input
 *       '404':
 *         description: Voucher not found with the specified ID
 *       '500':
 *         description: Internal server error
 */

voucherRouter.post('/update/:id', accessTokenValidator, wrapAsync(updateController))

export default voucherRouter
