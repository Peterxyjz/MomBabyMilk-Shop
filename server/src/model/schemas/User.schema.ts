import { ObjectId } from 'mongodb'
import { UserAccountStatus, UserVerifyStatus } from '~/constants/enums'

//đặt interface vì theo chuẩn ts thôi, chứ làm thực tế thì khác
interface UserType {
  _id?: ObjectId
  role_id: string
  full_name?: string //optinal là ?
  email: string
  date_of_birth?: Date
  password: string
  country?: string
  province?: string
  district?: string
  ward?: string
  address?: string
  phone?: string
  menber_ship?: number
  username: string // optional
  email_verify_token?: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token?: string // jwt hoặc '' nếu đã xác thực email
  verify?: UserVerifyStatus
  isActive?: UserAccountStatus
}

export default class User {
  _id?: ObjectId
  role_id: string
  full_name: string //optinal là ?
  email: string
  date_of_birth: Date
  password: string
  country: string
  province: string
  district: string
  ward: string
  address: string
  phone: string
  menber_ship: number
  username: string // optional
  email_verify_token: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token: string // jwt hoặc '' nếu đã xác thực email
  verify: UserVerifyStatus
  isActive: UserAccountStatus
  constructor(user: UserType) {
    const date = new Date() //tạo này cho ngày created_at updated_at bằng nhau
    this._id = user._id || new ObjectId() // tự tạo id
    this.role_id = user.role_id
    this.full_name = user.full_name || ''
    this.email = user.email
    this.date_of_birth = user.date_of_birth || date
    this.password = user.password
    this.country = user.country || ''
    this.province = user.province || ''
    this.district = user.district || ''
    this.ward = user.ward || ''
    this.address = user.address || ''
    this.phone = user.phone || ''
    this.menber_ship = user.menber_ship || 0
    this.username = user.username || ''
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.isActive = user.isActive || UserAccountStatus.Actived
  }
}
