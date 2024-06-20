import { config } from 'dotenv'
import databaseService from './database.services'
import Revenue from '~/model/schemas/Revenue.schema'
config()

class RevenueServices {
  async getAll() {
    return await databaseService.revenue.find({}).toArray()
  }

  async upload(revenue: Revenue) {
    const result = await databaseService.revenue.insertOne(revenue)
    return result
  }
}
const revenueServices = new RevenueServices()
export default revenueServices
