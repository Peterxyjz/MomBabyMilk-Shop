import { ObjectId } from 'mongodb'
interface FeedBackType {
  _id?: ObjectId
  staff_id: string
  product_id: string
  description: string
  created_at?: Date
}

export default class FeedBack {
  _id?: ObjectId
  staff_id: string
  product_id: string
  description: string
  created_at?: Date

  constructor(feedback: FeedBackType) {
    const date = new Date()
    this._id = feedback._id || new ObjectId()
    this.staff_id = feedback.staff_id
    this.product_id = feedback.product_id
    this.description = feedback.description
    this.created_at = date
  }
}
