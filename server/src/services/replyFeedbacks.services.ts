import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from './database.services'
import News from '~/model/schemas/News.schema'
import FeedBack from '~/model/schemas/Feeback.schema'
import ReplyFeedBack from '~/model/schemas/ReplyFeeback.schema'

config()

class ReplyFeedBackService {
  async upload(feeback: ReplyFeedBack) {
    const result = await databaseService.replyFeebacks.insertOne(feeback)
    return result
  }
}
const replyFeedBackService = new ReplyFeedBackService()
export default replyFeedBackService
