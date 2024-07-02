import { Router } from 'express'
import { getAllController, uploadController } from '~/controllers/news.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'


import { wrapAsync } from '~/utils/handlers'

const newsRouter = Router()

//upload:
newsRouter.post('/upload', accessTokenValidator, wrapAsync(uploadController))
newsRouter.get('/all-news', wrapAsync(getAllController))
export default newsRouter
