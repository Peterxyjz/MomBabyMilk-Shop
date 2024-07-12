import { Router } from 'express'
import { getAllController } from '~/controllers/revenue.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const revenueRouter = Router()

//upload:
/**
 * @openapi
 * /revenue/all-revenue:
 *   get:
 *     tags:
 *       - revenue
 *     summary: Lấy tất cả doanh thu
 *     description: Lấy tất cả doanh thu
 *     operationId: getAllRevenue
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
 *                   example: Lấy tất cả doanh thu
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 666a9a1a61cdb8a248ae3e25
 *                       type:
 *                         type: number
 *                         example: 0
 *                       total:
 *                         type: number
 *                         example: 100000
 *                       completed_date:
 *                         type: string
 *                         example: 2022-06-21T06:15:10.118Z
 *       '500':
 *         description: Internal server error
 */

revenueRouter.get('/all-revenue', wrapAsync(getAllController))




export default revenueRouter
