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
databaseService.connect()
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000']

app.use(cors({ origin: true }))

app.use(express.json())
app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use('/brands', brandsRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Project MomBabyMilk này đang chạy trên post ${port}`)
})
