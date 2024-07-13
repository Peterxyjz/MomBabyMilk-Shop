import express from 'express'
const app = express()
import usersRouter from './routes/users.routes'
const port = 4000
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import cors from 'cors'
import productsRouter from './routes/products.routes'
import categoriesRouter from './routes/categories.routes'
import brandsRouter from './routes/brands.routes'
import inputBillsRouter from './routes/inputBills.routes'
import feedbacksRouter from './routes/feedbacks.routes'
import ordersRouter from './routes/orders.routes'
import revenueRouter from './routes/revenue.routes'
import './utils/automatic'
import voucherRouter from './routes/vouchers.routes'
import newsRouter from './routes/news.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MomBabyMilk-Shop Document API',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.ts'] // files containing annotations as above
}

const openapiSpecification = swaggerJsdoc(options)
//https://localhost:4000/
databaseService.connect()
app.use(cors({ origin: true }))

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use('/brands', brandsRouter)
app.use('/inputBills', inputBillsRouter)
app.use('/feedbacks', feedbacksRouter)
app.use('/orders', ordersRouter)
app.use('/revenue', revenueRouter)
app.use('/vouchers', voucherRouter)
app.use('/news', newsRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Project MomBabyMilk này đang chạy trên post ${port}`)
})
