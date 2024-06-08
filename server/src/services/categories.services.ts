import { body } from 'express-validator'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import Category from '~/model/schemas/Category.schema'
import databaseService from './database.services'
config()

class CategoriesService {
  async upload(category: Category) {
    category._id = new ObjectId()
    const result = await databaseService.categories.insertOne(
      new Category({
        _id: category._id,
        ...category
      })
    )
    return result
  }

  async getAll() {
    return await databaseService.categories.find({}).toArray()
  }
  // getById:
  async getById(id: string) {
    const filter = { _id: new ObjectId(id) }
    return await databaseService.categories.findOne(filter)
  }
  //update:
  async update(id: string, category: Category) {
    const filter = { _id: new ObjectId(id) }
    const update = { $set: category }
    return await databaseService.categories.updateOne(filter, update)
  }
  //delete:
  async delete(id: string) {
    const filter = { _id: new ObjectId(id) }
    return await databaseService.categories.deleteOne(filter)
  }
}
const categoriesService = new CategoriesService()
export default categoriesService
