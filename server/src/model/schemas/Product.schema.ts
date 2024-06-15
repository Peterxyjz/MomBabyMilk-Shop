import { ObjectId } from 'mongodb'
import { ProductStatus } from '~/constants/enums'
interface ProductType {
  _id?: ObjectId
  brand_id: string
  category_id: string
  product_name: string
  price: number
  description: string
  age: string
  discount: number
  imgUrl: string
  isActive: boolean
}

export default class Product {
  _id?: ObjectId
  brand_id: string
  category_id: string
  product_name: string
  price: number
  description: string
  age: string
  discount: number
  imgUrl: string
  isActive?: boolean
  constructor(product: ProductType) {
    this._id = product._id || new ObjectId() // tự tạo id
    this.brand_id = product.brand_id
    this.category_id = product.category_id
    this.product_name = product.product_name
    this.price = product.price
    this.description = product.description
    this.age = product.age
    this.discount = product.discount
    this.imgUrl = product.imgUrl
    this.isActive = product.isActive || false
  }
}
