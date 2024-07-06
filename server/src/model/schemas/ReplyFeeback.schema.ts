import { ObjectId } from 'mongodb'
interface ReplyFeedBackType {
  _id?: ObjectId
  product_id: string
  description: string

  user_id: string
  created_at?: Date
}

export default class ReplyFeedBack {
  _id?: ObjectId
  product_id: string
  description: string

  user_id: string
  created_at?: Date

  constructor(feedback: ReplyFeedBackType) {
    const date = new Date()
    this._id = feedback._id || new ObjectId()
    this.product_id = feedback.product_id
    this.description = feedback.description

    this.user_id = feedback.user_id
    this.created_at = feedback.created_at || date
  }
}
