import { Router } from 'express'
import { getAllController } from '~/controllers/wareHouse.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const wareHouseRouter = Router()

//upload:
/**
 * @swagger
 * /all-warehouse:
 *   get:
 *     summary: Retrieve a list of all warehouses
 *     tags: [wareHouse]
 *     responses:
 *       200:
 *         description: A list of warehouses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The warehouse ID
 *                     example: '123'
 *                   name:
 *                     type: string
 *                     description: The warehouse name
 *                     example: 'Main Warehouse'
 */
wareHouseRouter.get('/all-warehouse', wrapAsync(getAllController)) //readAll
export default wareHouseRouter
