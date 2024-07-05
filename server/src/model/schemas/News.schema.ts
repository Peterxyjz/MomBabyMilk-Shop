import { ObjectId } from 'mongodb'
interface NewsType {
  _id?: ObjectId
  news_name: string
  staff_id: string
  product_id: string
  description: string
  created_at?: Date
  img_url?: string
}

export default class News {
  _id?: ObjectId
  news_name: string
  staff_id: string
  product_id: string
  description: string
  created_at?: Date
  img_url?: string

  constructor(news: NewsType) {
    const date = new Date()
    this.news_name = news.news_name
    this._id = news._id || new ObjectId()
    this.staff_id = news.staff_id
    this.product_id = news.product_id
    this.description = news.description
    this.created_at = date
    this.img_url = news.img_url || ''
  }
}
