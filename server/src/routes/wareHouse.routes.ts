import { Router } from 'express'
import { getAllController } from '~/controllers/wareHouse.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const wareHouseRouter = Router()

//upload:
wareHouseRouter.get('/all-warehouse', wrapAsync(getAllController)) //readAll
export default wareHouseRouter
