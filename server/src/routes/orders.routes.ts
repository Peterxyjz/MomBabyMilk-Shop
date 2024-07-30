import { Router } from 'express'
import {
  deleteController,
  getAllController,
  getOrderByIdController,
  getOrderController,
  updateStatusController,
  uploadController
} from '~/controllers/orders.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'

import { wrapAsync } from '~/utils/handlers'

const ordersRouter = Router()

//upload:
/**
 * @swagger
 * /orders/upload:
 *   post:
 *     tags:
 *       - orders
 *     summary: Tạo đơn hàng
 *     description: Uploads a new order, processes voucher codes, updates user information, and adjusts inventory.
 *     operationId: uploadOrder
 *     requestBody:
 *       description: Order details and related information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               voucher_code:
 *                 type: string
 *                 example: ""
 *               voucher_fee:
 *                 type: number
 *                 example: 0
 *               cart_list:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "666f16d382f5bceb1fe0d275"
 *                     product_name:
 *                       type: string
 *                       example: "Sữa Ovaltine lúa mạch Hương Vị Socola 180ml"
 *                     description:
 *                       type: string
 *                       example: "Sữa Ovaltine lúa mạch Hương Vị Socola 180ml cung cấp vitamin và khoáng chất..."
 *                     price:
 *                       type: string
 *                       example: "34000"
 *                     discount:
 *                       type: string
 *                       example: "20"
 *                     quantity:
 *                       type: number
 *                       example: 1
 *                     imgUrl:
 *                       type: string
 *                       example: "https://firebasestorage.googleapis.com/..."
 *                     brand_id:
 *                       type: string
 *                       example: "6661fbc802a3c02580d9c00a"
 *                     brand_name:
 *                       type: string
 *                       example: "Nestle"
 *                     category_id:
 *                       type: string
 *                       example: "66600156c5477af75504134f"
 *                     category_name:
 *                       type: string
 *                       example: "Sữa pha sẵn"
 *                     age:
 *                       type: string
 *                       example: "Không dùng cho trẻ dưới 1 tuổi"
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     sales:
 *                       type: number
 *                       example: 11
 *                     rating:
 *                       type: number
 *                       example: 0
 *                     reviewer:
 *                       type: number
 *                       example: 0
 *               customer_infor:
 *                 type: object
 *                 properties:
 *                   full_name:
 *                     type: string
 *                     example: "Phong Đẹp Trai"
 *                   address:
 *                     type: string
 *                     example: "132/1212 Phan Lâm, Xã Như Cố, Huyện Chợ Mới, Bắc Kạn"
 *                   phone:
 *                     type: string
 *                     example: "0909000000"
 *                   email:
 *                     type: string
 *                     example: "phong@gmail.com"
 *               payment_method:
 *                 type: string
 *                 example: "COD"
 *               ship_fee:
 *                 type: number
 *                 example: 50000
 *               total_price:
 *                 type: number
 *                 example: 77200
 *               user:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "666a9a1a61cdb8a248ae3e25"
 *                   full_name:
 *                     type: string
 *                     example: "Phong Siêu Xấu Traii"
 *                   address:
 *                     type: string
 *                     example: "132/1212 Phan Lâm1, Xã Định Hiệp, Huyện Dầu Tiếng, Bình Dương"
 *                   phone:
 *                     type: string
 *                     example: "0907089079"
 *                   email:
 *                     type: string
 *                     example: "phong@gmail.com"
 *                   member_ship:
 *                     type: number
 *                     example: 861210
 *                   isActive:
 *                     type: integer
 *                     example: 1
 *                   date_of_birth:
 *                     type: string
 *                     format: date
 *                     example: "2003-01-10T17:00:00.000Z"
 *                   country:
 *                     type: string
 *                     example: ""
 *                   province:
 *                     type: string
 *                     example: "11"
 *                   district:
 *                     type: string
 *                     example: "101"
 *                   ward:
 *                     type: string
 *                     example: "3376"
 *                   role_id:
 *                     type: string
 *                     example: "6649cbd320733271d0ff89a5"
 *                   username:
 *                     type: string
 *                     example: "Phong Siêu Đẹp Traii"
 *                   verify:
 *                     type: integer
 *                     example: 1
 *     responses:
 *       '200':
 *         description: Order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order successfully created"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "649f3f3f3f4e9d2b3c7b0e6f"
 *                     total_price:
 *                       type: number
 *                       example: 77200
 *                     status:
 *                       type: string
 *                       example: "Required"
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Voucher or user not found
 *       '500':
 *         description: Internal server error
 */

ordersRouter.post('/upload', wrapAsync(uploadController)) //readAll

/**
 * @swagger
 * /orders/all-orders:
 *   get:
 *     tags:
 *       - orders
 *     summary: Lấy tất cả đơn hàng
 *     description: Fetches a list of all orders from the database.
 *     operationId: getAllOrders

 *     responses:
 *       '200':
 *         description: Successful operation, returns a list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders retrieved successfully"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "649f3f3f3f4e9d2b3c7b0e6f"
 *                       member_id:
 *                         type: string
 *                         example: "649f3f3f3f4e9d2b3c7b0e6e"
 *                       full_name:
 *                         type: string
 *                         example: "Phong Đẹp Trai"
 *                       address:
 *                         type: string
 *                         example: "132/1212 Phan Lâm, Xã Như Cố, Huyện Chợ Mới, Bắc Kạn"
 *                       phone:
 *                         type: string
 *                         example: "0909000000"
 *                       email:
 *                         type: string
 *                         example: "phong@gmail.com"
 *                       payment_method:
 *                         type: string
 *                         example: "COD"
 *                       ship_fee:
 *                         type: number
 *                         example: 50000
 *                       total_price:
 *                         type: number
 *                         example: 77200
 *                       status:
 *                         type: string
 *                         example: "Required"
 *                       required_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-12T17:09:05.773Z"
 *       '500':
 *         description: Internal server error
 */

ordersRouter.get('/all-orders', wrapAsync(getAllController))

/**
 * @swagger
 * /orders/get-orderforuser:
 *   post:
 *     tags:
 *       - orders
 *     summary: Lấy đơn bằng bằng id người dùng
 *     description: Fetches a list of orders for a specific user based on the provided user ID.
 *     operationId: getOrdersForUser
 *     requestBody:
 *       description: User ID to retrieve orders for
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "649f3f3f3f4e9d2b3c7b0e6e"
 *     responses:
 *       '200':
 *         description: Successful operation, returns a list of orders for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders retrieved successfully for user"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "649f3f3f3f4e9d2b3c7b0e6f"
 *                       member_id:
 *                         type: string
 *                         example: "649f3f3f3f4e9d2b3c7b0e6e"
 *                       full_name:
 *                         type: string
 *                         example: "Phong Đẹp Trai"
 *                       address:
 *                         type: string
 *                         example: "132/1212 Phan Lâm, Xã Như Cố, Huyện Chợ Mới, Bắc Kạn"
 *                       phone:
 *                         type: string
 *                         example: "0909000000"
 *                       email:
 *                         type: string
 *                         example: "phong@gmail.com"
 *                       payment_method:
 *                         type: string
 *                         example: "COD"
 *                       ship_fee:
 *                         type: number
 *                         example: 50000
 *                       total_price:
 *                         type: number
 *                         example: 77200
 *                       status:
 *                         type: string
 *                         example: "Required"
 *                       required_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-12T17:09:05.773Z"
 *       '400':
 *         description: Bad request, invalid user ID
 *       '500':
 *         description: Internal server error
 */

ordersRouter.post('/get-orderforuser', wrapAsync(getOrderController))

/**
 * @swagger
 * /orders/get-order/{id}:
 *   get:
 *     tags:
 *       - orders
 *     summary: Lấy đơn hàng bằng id đơn hàng
 *     description: Fetches details of a specific order based on the provided order ID.
 *     operationId: getOrderById
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *           example: 669239389fb9971f7d3ec8d8
 *         description: The ID of the order to retrieve
 *     responses:
 *       '200':
 *         description: Successful operation, returns the order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order retrieved successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "649f3f3f3f4e9d2b3c7b0e6f"
 *                     member_id:
 *                       type: string
 *                       example: "649f3f3f3f4e9d2b3c7b0e6e"
 *                     full_name:
 *                       type: string
 *                       example: "Phong Đẹp Trai"
 *                     address:
 *                       type: string
 *                       example: "132/1212 Phan Lâm, Xã Như Cố, Huyện Chợ Mới, Bắc Kạn"
 *                     phone:
 *                       type: string
 *                       example: "0909000000"
 *                     email:
 *                       type: string
 *                       example: "phong@gmail.com"
 *                     payment_method:
 *                       type: string
 *                       example: "COD"
 *                     ship_fee:
 *                       type: number
 *                       example: 50000
 *                     total_price:
 *                       type: number
 *                       example: 77200
 *                     status:
 *                       type: string
 *                       example: "Required"
 *                     required_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-12T17:09:05.773Z"
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */

ordersRouter.get('/get-order/:id', wrapAsync(getOrderByIdController))

/**
 * @swagger
 * /orders/delete:
 *   post:
 *     tags:
 *       - orders
 *     summary: Xóa đơn hằng bằng id đơn hàng
 *     description: Deletes a specific order from the database based on the provided order ID.
 *     operationId: deleteOrderById
 *     requestBody:
 *       description: The ID of the order to delete
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *                 example: "649f3f3f3f4e9d2b3c7b0e6f"
 *     responses:
 *       '200':
 *         description: Successful operation, order deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order deleted successfully"
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */

ordersRouter.post('/delete', wrapAsync(deleteController))

/**
 * @swagger
 * /orders/status-order:
 *   post:
 *     tags:
 *       - orders
 *     summary: Cập nhật trạng thái đơn hằng
 *     description: Updates the status of a specific order based on the provided order ID and status.
 *     operationId: updateOrderStatus
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Order ID and new status to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *                 example: "649f3f3f3f4e9d2b3c7b0e6f"
 *               status:
 *                 type: string
 *                 example: "Cancel"
 *             required:
 *               - order_id
 *               - status
 *     responses:
 *       '200':
 *         description: Successful operation, order status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order status updated successfully"
 *       '400':
 *         description: Bad request if order_id or status is missing
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */

ordersRouter.post('/status-order', accessTokenValidator, wrapAsync(updateStatusController))
export default ordersRouter
