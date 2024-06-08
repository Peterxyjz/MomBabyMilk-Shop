import { ObjectId } from 'mongodb'
interface CategoryType {
  _id?: ObjectId
  category_name: string
  description: string
}

export default class Category {
  _id?: ObjectId
  category_name: string
  description: string
  constructor(category: CategoryType) {
    const date = new Date() //tạo này cho ngày created_at updated_at bằng nhau
    this._id = category._id || new ObjectId() // tự tạo id
    this.category_name = category.category_name
    this.description = category.description
  }
}
