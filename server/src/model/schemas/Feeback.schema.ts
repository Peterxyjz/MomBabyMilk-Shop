import { ObjectId } from 'mongodb'
interface FeedBackType {
  _id?: ObjectId
  product_id: string
  description: string
  rating: number
  user_id: string
  created_at?: Date
  reply_id?: string
}

export default class FeedBack {
  _id?: ObjectId
  product_id: string
  description: string
  rating: number
  user_id: string
  created_at?: Date
  reply_id?: string

  constructor(feedback: FeedBackType) {
    const date = new Date()
    this._id = feedback._id || new ObjectId()
    this.product_id = feedback.product_id
    this.description = feedback.description
    this.rating = feedback.rating
    this.user_id = feedback.user_id
    this.created_at = feedback.created_at || date
    this.reply_id = feedback.reply_id || undefined
  }
}
