import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from './database.services'
import News from '~/model/schemas/News.schema'
import FeedBack from '~/model/schemas/Feeback.schema'

config()

class FeedBackService {
  async upload(feeback: FeedBack) {
    const result = await databaseService.feedbacks.insertOne(feeback)
    return result
  }
}
const feedBackService = new FeedBackService()
export default feedBackService
