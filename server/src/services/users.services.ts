import { body } from 'express-validator'
import User from '~/model/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/model/requests/User.requests'
import { hashPassword } from '~/utils/crypto'
import { hashToSixDigit, signToken } from '~/utils/jwt'
import { TokenType, UserAccountStatus, UserVerifyStatus } from '~/constants/enums'
import Role from '~/model/schemas/Role.schema'
import RefreshToken from '~/model/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
import { generateEmailVerify } from '~/helper/emailTemplate'
import sendMail from '~/helper/send.mail'
config()
class UsersService {
  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string //thêm
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string //thêm
    })
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

    //insertOne sẽ trả về 1 object, trong đó có thuộc tính insertedId là user_Id của user vừa tạo
    //vì vậy ta sẽ lấy user_Id đó ra để tạo token
    const user_Id = result.insertedId.toString()
    // const accessToken = await this.signAccessToken(user_Id)
    // const refreshToken = await this.signRefreshToken(user_Id)
    //nên viết là thì sẽ giảm thời gian chờ 2 cái này tạo ra
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_Id)
    //đây cũng chính là lý do mình chọn xử lý bất đồng bộ, thay vì chọn xử lý đồng bộ
    //Promise.all giúp nó chạy bất đồng bộ, chạy song song nhau, giảm thời gian

    //lưu lại refreshToken và collection refreshTokens mới tạo
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_Id), token: refresh_token })
    )

    //user_id ta có là string, mà trong database thì user_id là ObjectId
    //nên ta không truyền là user_id: user_id, mà là user_id: new ObjectId(user_id)
    console.log('email_verify_token', email_verify_token) //mô phỏng send email, test xong xóa
    return { access_token, refresh_token, email_verify_token, user, digit }
    //ta sẽ return 2 cái này về cho client
    //thay vì return user_Id về cho client
  }
  async checkEmailExist(email: string) {
    //vào database tìm xem có hông
    const user = await databaseService.users.findOne({ email })
    return Boolean(user) //có true, k false
  }

  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token })
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
    //lưu refresg_token vào database
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token })
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
    // await sendMail({
    //   email: email,
    //   subject: 'Email Verification Mail',
    //   html: emailHtml
    // })

    console.log('forgot_password_token: ', forgot_password_token)
    console.log('digit: ', digit)
    return {
      message: USERS_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD
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
          forgot_password_token: '',
          updated_at: '$$NOW'
        }
      }
    ])
    //nếu bạn muốn ngta đổi mk xong tự động đăng nhập luôn thì trả về access_token và refresh_token
    //ở đây mình chỉ cho ngta đổi mk thôi, nên trả về message
    return {
      message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
    }
  }

  async checkRole(user: User) {
    const roleAccount = await databaseService.roles.findOne({ _id: new ObjectId(user.role_id) })
    return roleAccount?.role_name
  }
}

const usersService = new UsersService()
export default usersService
