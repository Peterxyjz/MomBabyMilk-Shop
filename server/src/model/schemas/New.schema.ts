import { ObjectId } from 'mongodb'
interface NewType {
  _id?: ObjectId
  staff_id: string
  product_id: string
  description: string
  created_at?: Date
}

export default class New {
  _id?: ObjectId
  staff_id: string
  product_id: string
  description: string
  created_at?: Date

  constructor(news: NewType) {
    const date = new Date()
    this._id = news._id || new ObjectId()
    this.staff_id = news.staff_id
    this.product_id = news.product_id
    this.description = news.description
    this.created_at = date
  }
}
