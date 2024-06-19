import { ObjectId } from 'mongodb'
interface WareHouseType {
  _id?: ObjectId

  amount?: number
}

export default class WareHouse {
  _id?: ObjectId

  amount?: number
  constructor(warehouse: WareHouseType) {
    this._id = warehouse._id || new ObjectId()

    this.amount = warehouse.amount || 0
  }
}
