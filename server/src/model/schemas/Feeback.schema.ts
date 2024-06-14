import { ObjectId } from 'mongodb'
interface FeedBackType {
  _id?: ObjectId
  product_id: string
  description: string
  rating: number
  user_id: string
  created_at?: Date
}

export default class FeedBack {
  _id?: ObjectId
  product_id: string
  description: string
  rating: number
  user_id: string
  created_at?: Date

  constructor(feedback: FeedBackType) {
    const date = new Date()
    this._id = feedback._id || new ObjectId()
    this.product_id = feedback.product_id
    this.description = feedback.description
    this.rating = feedback.rating
    this.user_id = feedback.user_id
    this.created_at = date
  }
}
