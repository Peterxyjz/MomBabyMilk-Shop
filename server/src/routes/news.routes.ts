import { Router } from 'express'
import { getAllController, getNewsByProIdController, getNewsController, uploadController } from '~/controllers/news.controllers'
import { isParamsIdValidator } from '~/middlewares/products.middleware'
import { accessTokenValidator } from '~/middlewares/users.middlewares'


import { wrapAsync } from '~/utils/handlers'

const newsRouter = Router()

//upload:
newsRouter.post('/upload', accessTokenValidator, wrapAsync(uploadController))
newsRouter.get('/all-news', wrapAsync(getAllController))
newsRouter.get('/news/:id', isParamsIdValidator, wrapAsync(getNewsController))
newsRouter.get('/product/:id', isParamsIdValidator, wrapAsync(getNewsByProIdController))
export default newsRouter
