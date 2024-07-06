import { body } from 'express-validator'
import User from '~/model/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/model/requests/User.requests'
import { hashPassword } from '~/utils/crypto'
import { hashToSixDigit, signToken, verifyToken } from '~/utils/jwt'
import { TokenType, UserAccountStatus, UserVerifyStatus } from '~/constants/enums'
import Role from '~/model/schemas/Role.schema'
import RefreshToken from '~/model/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import { generateEmailStatus, generateEmailVerify } from '~/helper/emailTemplate'
import sendMail from '~/helper/send.mail'
import { ErrorWithStatus } from '~/model/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import axios from 'axios'
import { result } from 'lodash'

config()
class UsersService {
  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
    })
  }
  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken({ user_id })])
  }
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string //thêm
    })
  }
  private signRefreshToken({ user_id, exp }: { user_id: string; exp?: number }) {
    if (exp) {
      return signToken({
        payload: { user_id, token_type: TokenType.RefreshToken, exp },

        privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
      })
    } else {
      return signToken({
        payload: { user_id, token_type: TokenType.RefreshToken },
        options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN },
        privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
      })
    }
  }

  async register(payload: RegisterReqBody) {
    const role = await databaseService.roles.findOne({ role_name: 'Member' })
    const roleId = role?._id?.toString() || ''

    const user_id = new ObjectId()
    const digit = await hashToSixDigit()
    console.log('6 so: ', digit)
    const email_verify_token = await this.signEmailVerifyToken(user_id.toString(), digit)
    //ta đành phải tự tạo user_id thay vì để mongodb tự tạo
    //vì ta cần user_id để tạo email_verify_token

    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        email_verify_token,
        password: hashPassword(payload.password),
        role_id: roleId,
        isActive: UserAccountStatus.Actived
      })
    )
    const user = await databaseService.users.findOne({ _id: user_id })

    const user_Id = result.insertedId.toString()
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_Id)
    const { exp, iat } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_Id), token: refresh_token, iat, exp })
    )

    return { access_token, refresh_token, email_verify_token, user, digit }
  }

  async registerGoogle(payload: RegisterReqBody) {
    const role = await databaseService.roles.findOne({ role_name: 'Member' })
    const roleId = role?._id?.toString() || ''

    const user_id = new ObjectId()

    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        verify: UserVerifyStatus.Verified,
        password: hashPassword(payload.password),
        role_id: roleId,
        isActive: UserAccountStatus.Actived
      })
    )
    const user = await databaseService.users.findOne({ _id: user_id })

    const user_Id = result.insertedId.toString()
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_Id)
    const { exp, iat } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_Id), token: refresh_token, iat, exp })
    )

    return { access_token, refresh_token, user }
  }
  async checkEmailExist(email: string) {
    //vào database tìm xem có hông
    const user = await databaseService.users.findOne({ email })
    return Boolean(user) //có true, k false
  }

  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)
    const { exp, iat } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )
    return { access_token, refresh_token }
  }

  async logout(refresh_token: string) {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    }
  }

  public signEmailVerifyToken(user_id: string, digit: string) {
    return signToken({
      payload: { user_id, digit, token_type: TokenType.EmailVerificationToken },
      options: { expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRE_IN },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string //thêm
    })
  }

  async verifyEmail(user_id: string) {
    //token này chứa access_token và refresh_token
    const [token] = await Promise.all([
      this.signAccessAndRefreshToken(user_id),
      databaseService.users.updateOne(
        { _id: new ObjectId(user_id) }, //tìm user thông qua _id
        {
          $set: {
            email_verify_token: '',
            verify: UserVerifyStatus.Verified,
            updated_at: '$$NOW'
          }
        }
        //set email_verify_token thành rỗng,và cập nhật ngày cập nhật, cập nhật status của verify
      )
    ])
    //destructuring token ra
    const [access_token, refresh_token] = token
    const { exp, iat } = await this.decodeRefreshToken(refresh_token)
    //lưu refresg_token vào database
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )
    //nếu họ verify thành công thì gữi họ access_token và refresh_token để họ đăng nhập luôn
    return {
      access_token,
      refresh_token
    }
  }

  async resendEmailVerify(user_id: string) {
    //tạo ra email_verify_token mới
    const digit = await hashToSixDigit()
    const email_verify_token = await this.signEmailVerifyToken(user_id, digit)

    console.log('digit_again: ', digit)

    //chưa làm chức năng gữi email, nên giả bộ ta đã gữi email cho client rồi, hiển thị bằng console.log

    //vào database và cập nhật lại email_verify_token mới trong table user
    await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          email_verify_token,
          updated_at: '$$NOW'
        }
      }
    ])
    //trả về message
    return {
      message: USERS_MESSAGES.RESEND_VERIFY_EMAIL_SUCCESS
    }
  }

  //tạo hàm signForgotPasswordToken
  public signForgotPasswordToken(user_id: string, digit: string) {
    return signToken({
      payload: { user_id, digit, token_type: TokenType.ForgotPasswordToken },
      options: { expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRE_IN },
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string //thêm
    })
  }
  //vào .env thêm 2 biến môi trường FORGOT_PASSWORD_TOKEN_EXPIRE_IN, và JWT_SECRET_FORGOT_PASSWORD_TOKEN
  //JWT_SECRET_FORGOT_PASSWORD_TOKEN = '123!@#22'
  //FORGOT_PASSWORD_TOKEN_EXPIRE_IN = '7d'

  async forgotPassword(user_id: string, email: string) {
    //tạo ra forgot_password_token
    const digit = hashToSixDigit()
    console.log('digit-forgot: ', digit)
    console.log('user_id: ', user_id)

    const forgot_password_token = await this.signForgotPasswordToken(user_id, digit)
    //cập nhật vào forgot_password_token và user_id
    // await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
    //   {
    //     $set: { forgot_password_token: forgot_password_token, updated_at: '$$NOW' }
    //   }
    // ])

    await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: { forgot_password_token: forgot_password_token, updated_at: '$$NOW' }
      }
    ])

    //gữi email cho người dùng đường link có cấu trúc như này
    //http://appblabla/forgot-password?token=xxxx
    //xxxx trong đó xxxx là forgot_password_token
    //sau này ta sẽ dùng aws để làm chức năng gữi email, giờ ta k có
    //ta log ra để test
    //todo Send mail
    const verificationLink = `${process.env.BACKEND_URL}/verify-forgot-password?forgot_password_token=${digit}`
    const emailHtml = generateEmailVerify(email, verificationLink, digit)
    sendMail({
      email: email,
      subject: 'Email Verification Mail',
      html: emailHtml
    })

    console.log('forgot_password_token: ', forgot_password_token)
    console.log('digit: ', digit)
    return {
      message: USERS_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD,
      user_id
    }
  }
  //vào messages.ts thêm CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password'

  async resetPassword(user_id: string, password: string) {
    //tìm user thông qua user_id và cập nhật lại password và forgot_password_token
    //tất nhiên là lưu password đã hash rồi
    //ta không cần phải kiểm tra user có tồn tại không, vì forgotPasswordValidator đã làm rồi
    databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          password: hashPassword(password),
          forgot_password_token: ''
        }
      }
    ])
    //nếu bạn muốn ngta đổi mk xong tự động đăng nhập luôn thì trả về access_token và refresh_token
    //ở đây mình chỉ cho ngta đổi mk thôi, nên trả về message
    return {
      message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
    }
  }

  async getRoles() {
    return await databaseService.roles.find({}).toArray()
  }
  async checkRole(user: User) {
    const roleAccount = await databaseService.roles.findOne({ _id: new ObjectId(user.role_id) })
    return roleAccount?.role_name
  }

  private async getOAuthGoogleToken(code: string) {
    const body = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    }
    //giờ ta gọi api của google, truyền body này lên để lấy id_token
    //ta dùng axios để gọi api `npm i axios`
    const { data } = await axios.post(`https://oauth2.googleapis.com/token`, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return data as {
      access_token: string
      id_token: string
    }
  }

  private async getGoogleUserInfo(access_token: string, id_token: string) {
    const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
      params: {
        access_token,
        alt: 'json'
      },
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    })

    return data as {
      id: string
      email: string
      email_verified: boolean
      name: string
      given_name: string
      family_name: string
      picture: string
      locale: string
    }
  }

  async oAuth(code: string) {
    //dùng code lấy bộ token từ google
    const { access_token, id_token } = await this.getOAuthGoogleToken(code)
    const userInfor = await this.getGoogleUserInfo(access_token, id_token)
    // kiểm tra ẻmail verify chưa
    console.log('userInfor: ', userInfor.email_verified)
    if (!userInfor.email_verified) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.EMAIL_NOT_VERIFIED,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    // check email ton tai chua
    const user = await databaseService.users.findOne({ email: userInfor.email })
    //có thì là client đăng nhập
    if (user) {
      const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user._id.toString())
      const { exp, iat } = await this.decodeRefreshToken(refresh_token)
      // luuw refresh
      await databaseService.refreshTokens.insertOne(
        new RefreshToken({ user_id: new ObjectId(user._id), token: refresh_token, iat, exp })
      )
      return {
        user: user,
        result: {
          access_token: access_token,
          refresh_token: refresh_token
        }
      }
    } else {
      //random password
      const password = Math.random().toString(36).substring(1, 15)
      //chưa tồn tại thì cho tạo mới, hàm register(đã viết trước đó) trả về access và refresh token
      const data = await this.registerGoogle({
        email: userInfor.email,
        password,
        username: userInfor.name,
        confirm_password: password
      })
      return {
        user: data.user,
        result: {
          access_token: data.access_token,
          refresh_token: data.refresh_token
        }
      }
    }
  }
  async getAllUser() {
    return await databaseService.users.find({}).toArray()
  }

  async getMe(user_id: string) {
    // projection để loại bỏ các thuộc tính mà mình ko lấy
    const user = await databaseService.users.findOne(
      { _id: new ObjectId(user_id) },
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return user
  }

  async updateMe(user_id: string, payload: any) {
    const result = await databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      { $set: payload },
      { returnDocument: 'after' }
    )
    return result
  }
  async changeStatus(user_id: string) {
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (!user) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    if (user.isActive === UserAccountStatus.Actived) {
      const emailHtml = generateEmailStatus(user.username, 'bị cấm')
      sendMail({
        email: user.email,
        subject: 'Email Verification Mail',
        html: emailHtml
      })
    } else {
      const emailHtml = generateEmailStatus(user.username, 'được mở khóa')
      sendMail({
        email: user.email,
        subject: 'Email Verification Mail',
        html: emailHtml
      })
    }

    return await databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          isActive: user.isActive === UserAccountStatus.Actived ? UserAccountStatus.Blocked : UserAccountStatus.Actived
        }
      }
    )
  }

  async addUserByAdmin(payload: any) {
    const role = await databaseService.roles.findOne({ role_name: 'Staff' })
    const roleId = role?._id?.toString() || ''
    const user_id = new ObjectId()
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,

        password: hashPassword(payload.password),
        role_id: roleId,
        verify: UserVerifyStatus.Verified,
        isActive: UserAccountStatus.Actived
      })
    )
    const user = await databaseService.users.findOne({ _id: user_id })

    const user_Id = result.insertedId.toString()
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_Id)
    const { exp, iat } = await this.decodeRefreshToken(refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_Id), token: refresh_token, iat, exp })
    )

    return { access_token, refresh_token }
  }
  async refreshToken({ user_id, refresh_token, exp }: { user_id: string; refresh_token: string; exp: number }) {
    //tạo mới
    const [access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken({
        user_id: user_id,
        exp
      })
    ])

    //vì một người đăng nhập ở nhiều nơi khác nhau, nên họ sẽ có rất nhiều document trong collection refreshTokens
    //ta không thể dùng user_id để tìm document cần update, mà phải dùng token, đọc trong RefreshToken.schema.ts
    await databaseService.refreshTokens.deleteOne({ token: refresh_token }) //xóa refresh
    const { iat } = await this.decodeRefreshToken(new_refresh_token)
    //insert lại document mới
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: new_refresh_token, iat, exp })
    )
    return { access_token, refresh_token: new_refresh_token }
  }

  async getById(user_id: string) {
    const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (!user) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USER_NOT_FOUND,
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY
      })
    }
    return user
  }
}

const usersService = new UsersService()
export default usersService
