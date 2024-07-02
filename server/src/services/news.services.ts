import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from './database.services'
import News from '~/model/schemas/News.schema'

config()

class NewsService {
  async upload(news: News) {
    const result = await databaseService.news.insertOne(news)
    return result
  }
}
const newsServices = new NewsService()
export default newsServices
