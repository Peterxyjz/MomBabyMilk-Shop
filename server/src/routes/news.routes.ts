import { Router } from 'express'
import { getAllController, getNewsController, uploadController } from '~/controllers/news.controllers'
import { isParamsIdValidator } from '~/middlewares/products.middleware'
import { accessTokenValidator } from '~/middlewares/users.middlewares'


import { wrapAsync } from '~/utils/handlers'

const newsRouter = Router()

//upload:
newsRouter.post('/upload', accessTokenValidator, wrapAsync(uploadController))
newsRouter.get('/all-news', wrapAsync(getAllController))
newsRouter.get('/news/:id', isParamsIdValidator, wrapAsync(getNewsController))
export default newsRouter
