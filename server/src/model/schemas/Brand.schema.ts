import { ObjectId } from 'mongodb'
interface BrandType {
  _id?: ObjectId
  brand_name: string
  address: string
  country: string
  phone: string
}

export default class Brand {
  _id?: ObjectId
  brand_name: string
  address: string
  country: string
  phone: string
  constructor(brand: BrandType) {
    this._id = brand._id || new ObjectId() // tự tạo id
    this.brand_name = brand.brand_name
    this.address = brand.address
    this.country = brand.country
    this.phone = brand.phone
  }
}
