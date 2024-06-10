import { ObjectId } from 'mongodb'
interface WareHouseType {
  _id?: ObjectId
  product_id: string
  amount?: number
}

export default class WareHouse {
  _id?: ObjectId
  product_id: string
  amount?: number
  constructor(warehouse: WareHouseType) {
    this._id = warehouse._id || new ObjectId()
    this.product_id = warehouse.product_id
    this.amount = warehouse.amount || 0
  }
}
