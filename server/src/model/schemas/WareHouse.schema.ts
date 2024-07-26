import { ObjectId } from 'mongodb'
import InputBillDetail from './InputBillDetail.schema'
interface ShipmentType extends InputBillDetail {
  amount_selled?: number
}

interface WareHouseType {
  _id?: ObjectId
  shipments?: ShipmentType[]
}

export default class WareHouse {
  _id?: ObjectId
  shipments?: ShipmentType[]
  constructor(warehouse: WareHouseType) {
    this._id = warehouse._id || new ObjectId()
    this.shipments =
      warehouse.shipments?.map((shipment) => ({
        ...shipment,
        amount_selled: shipment.amount_selled || 0
      })) || []
  }
}
