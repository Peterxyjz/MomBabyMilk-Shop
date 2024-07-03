import { ObjectId } from 'mongodb'
interface NewsType {
  _id?: ObjectId
  staff_id: string
  product_id: string
  description: string
  created_at?: Date
}

export default class News {
  _id?: ObjectId
  staff_id: string
  product_id: string
  description: string
  created_at?: Date

  constructor(news: NewsType) {
    const date = new Date()
    this._id = news._id || new ObjectId()
    this.staff_id = news.staff_id
    this.product_id = news.product_id
    this.description = news.description
    this.created_at = date
  }
}
