import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { body } from 'express-validator'
import sendMail from '~/helper/send.mail'
import {
  ForgotPasswordReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  TokenPayload,
  VerifyForgotPasswordReqBody
} from '~/model/requests/User.requests'
import User from '~/model/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
import { generateEmailVerify } from '~/helper/emailTemplate'
import { USERS_MESSAGES } from '~/constants/messages'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { UserVerifyStatus } from '~/constants/enums'
import { verifyToken } from '~/utils/jwt'
import { error } from 'console'
import { ErrorWithStatus } from '~/model/Errors'
import { verify } from 'crypto'
import { forEach, forIn } from 'lodash'
//login:
export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User // lấy user từ req
  const user_id = user._id as ObjectId // lấy _id từ user
  const result = await usersService.login(user_id.toString())

  return res.status(200).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result: result,
    user
  })
}
//admin

export const loginForAdminOrStaffController = async (req: Request, res: Response) => {
  const user = req.user as User // lấy user từ req
  const user_id = user._id as ObjectId // lấy _id từ user
  const checkRole = await usersService.checkRole(user)
  if (checkRole === 'Member') {
    return res.status(400).json({
      errors: {
        message: USERS_MESSAGES.LOGIN_FAIL
      }
    })
  }
  const result = await usersService.login(user_id.toString())
  const isAdmin = checkRole === 'Admin' ? true : false
  return res.status(200).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result: result,
    user,
    isAdmin
  })
}

//register:
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body) // thay luôn
  const verificationLink = `${process.env.BACKEND_URL}/verify-email?email_verify_token=${result.digit}`
  const emailHtml = generateEmailVerify(req.body.username, verificationLink, result.digit)
  sendMail({
    email: req.body.email,
    subject: 'Email Verification Mail',
    html: emailHtml
  })
  return res.status(200).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result: { access_token: result.access_token, refresh_token: result.refresh_token },
    user: result.user
  })
}

//logout:
export const logoutController = async (req: Request, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token) //hàm trả ra chuỗi báo logout thành công
  return res.json(result)
}

//verify:
export const emailVerifyController = async (req: Request, res: Response, next: NextFunction) => {
  // const { email_verify_token } = req.body
  // const user = await databaseService.users.findOne({ email_verify_token: email_verify_token })
  //ta có thể tìm user thông qua email_verify_token do người dùng gui lên lên thế này nhưng hiệu năng sẽ kém
  //nên thay vào đó ta sẽ lấy thông tin _id của user từ decoded_email_verify_token mà ta thu đc từ middleware trước
  //và tìm user thông qua _id đó
  // const { user_id } = req.decoded_email_verify_token as TokenPayload
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const req_digit = req.query.digit
  let user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  }) //hiệu năng cao hơn
  //nếu k có user thì cho lỗi 404: not found

  if (user === null) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  //nếu mà email_verify_token là rỗng: tức là account đã đc verify email trước đó rồi
  //thì mình sẽ trả về status 200 ok, với message là đã verify email trước đó rồi
  //chứ không trả về lỗi, nếu k thì client sẽ bối rối
  if (user.email_verify_token === '') {
    //mặc định là status 200
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  const emailtoken = await verifyToken({
    token: user.email_verify_token,
    secretOrPublicKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
  })
  const { digit } = emailtoken as TokenPayload

  if (req_digit !== digit) {
    throw new ErrorWithStatus({ message: USERS_MESSAGES.OTP_IS_INVALID, status: HTTP_STATUS.UNAUTHORIZED })
  }

  const result = await usersService.verifyEmail(user_id)

  user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  return res.status(200).json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result: result,
    user
  })
}

export const resendEmailVerifyController = async (req: Request, res: Response, next: NextFunction) => {
  //khi đến đây thì accesstokenValidator đã chạy rồi => access_token đã đc decode
  //và lưu vào req.user, nên trong đó sẽ có user._id để tao sử dụng
  const { user_id } = req.decoded_authorization as TokenPayload //lấy user_id từ decoded_authorization
  //từ user_id này ta sẽ tìm user trong database
  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })
  //nếu k có user thì trả về lỗi 404: not found
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  //nếu user đã verify email trước đó rồi thì trả về lỗi 400: bad request
  if (user.verify == UserVerifyStatus.Verified) {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  //nếu user chưa verify email thì ta sẽ gữi lại email verify cho họ
  //cập nhật email_verify_token mới và gữi lại email verify cho họ
  const result = await usersService.resendEmailVerify(user_id)
  //result chứa message nên ta chỉ cần trả  result về cho client
  return res.json(result)
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  //middleware forgotPasswordValidator đã chạy rồi, nên ta có thể lấy _id từ user đã tìm đc bằng email
  const { _id } = req.user as User
  //cái _id này là objectid, nên ta phải chuyển nó về string
  //chứ không truyền trực tiếp vào hàm forgotPassword
  const result = await usersService.forgotPassword((_id as ObjectId).toString(), req.user.email)

  return res.json(result)
}

export const verifyForgotPasswordTokenController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  //nếu đã đến bước này nghĩa là ta đã tìm có forgot_password_token hợp lệ
  //và đã lưu vào req.decoded_forgot_password_token
  //thông tin của user
  //ta chỉ cần thông báo rằng token hợp lệ
  return res.json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  //middleware resetPasswordValidator đã chạy rồi, nên ta có thể lấy đc user_id từ decoded_forgot_password_token
  const { user_id } = req.decoded_forgot_password_token as TokenPayload
  const { password } = req.body
  //vào database tìm user thông qua user_id này và cập nhật lại password mới
  //vì vào database nên ta sẽ code ở user.services
  const result = await usersService.resetPassword(user_id, password) //ta chưa code resetPassword
  return res.json(result)
}

export const oAuthController = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.query
  const data = await usersService.oAuth(code as string)
  const resultString = encodeURIComponent(JSON.stringify(data.result))
  const userString = encodeURIComponent(JSON.stringify(data.user))
  const urlRedirect = `${process.env.CLIENT_REDIRECT_CALLBACK}?result=${resultString}&user=${userString}`
  return res.redirect(urlRedirect)
}

export const getAllUserController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload //lấy user_id từ decoded_authorization
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    return res.status(400).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  const role_name = await usersService.checkRole(user)
  if (role_name !== 'Admin') {
    return res.status(400).json({
      message: 'Bạn không có quyền truy cập'
    })
  }
  const users = await usersService.getAllUser()
  const result: Array<User & { role_name: string }> = []
  for (const element of users) {
    const roleName = (await usersService.checkRole(element)) || 'Unknown'
    result.push({
      ...element,
      role_name: roleName
    })
  }
  return res.status(HTTP_STATUS.OK).json({
    users: result
  })
}

export const getMeController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  // vào database tìm userr có user_d đó và đưa cho client
  const result = await usersService.getMe(user_id)
  return res.json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    result
  })
}

export const updateMeController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  //user_id để biết phải cập nhật ai
  //lấy thông tin mới từ req.body
  const body = req.body
  //lấy các property mà client muốn cập nhật
  //ta sẽ viết hàm updateMe trong user.services
  //nhận vào user_id và body để cập nhật
  const result = await usersService.updateMe(user_id, body)
  return res.json({
    message: USERS_MESSAGES.UPDATE_ME_SUCCESS,
    result
  })
}

export const addUserController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_NOT_FOUND,
      status: HTTP_STATUS.BAD_REQUEST
    })
  }
  const role_name = await usersService.checkRole(user)
  if (role_name !== 'Admin') {
    throw new ErrorWithStatus({
      message: ' không có quyền thêm user',
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }

  next()
}
