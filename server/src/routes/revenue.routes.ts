import { Router } from 'express'
import { getAllController } from '~/controllers/revenue.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const revenueRouter = Router()

//upload:
revenueRouter.get('/all-revenue', wrapAsync(getAllController))
export default revenueRouter
