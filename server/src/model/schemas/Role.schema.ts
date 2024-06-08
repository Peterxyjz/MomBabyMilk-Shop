import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'

interface RoleType {
  _id?: ObjectId
  role_name: string
}

export default class Role {
  _id?: ObjectId
  role_name: string
  constructor(role: RoleType) {
    this._id = role._id || new ObjectId()
    this.role_name = role.role_name
  }
}
