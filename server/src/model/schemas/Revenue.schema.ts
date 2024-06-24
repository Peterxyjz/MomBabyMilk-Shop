import { ObjectId } from 'mongodb'
import { RevenueStatus } from '~/constants/enums'
interface RevenueType {
  _id?: ObjectId
  type: RevenueStatus
  total: number
  completed_date: Date
}

export default class Revenue {
  _id?: ObjectId
  type: RevenueStatus
  total: number
  completed_date: Date
  constructor(revenue: RevenueType) {
    this._id = revenue._id || new ObjectId()
    this.type = revenue.type
    this.total = revenue.total
    this.completed_date = revenue.completed_date
  }
}
