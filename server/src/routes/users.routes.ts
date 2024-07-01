import { Router } from 'express'
import {
  accessTokenValidator,
  checkEmailToken,
  checkPasswordToken,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  updateMeValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import {
  addUserController,
  changeStatusUserController,
  emailVerifyController,
  forgotPasswordController,
  getAllUserController,
  getMeController,
  loginController,
  loginForAdminOrStaffController,
  logoutController,
  oAuthController,
  refreshTokenController,
  registerController,
  resendEmailVerifyController,
  resetPasswordController,
  updateMeController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import { wrapAsync } from '~/utils/handlers'
const usersRouter = Router()
//user:
usersRouter.post('/register', registerValidator, wrapAsync(registerController))
usersRouter.post('/login', loginValidator, wrapAsync(loginController))
/*
des: cung cấp email, password
path: /login-admin-staff
method: POST
Header: không cần, vì  ngta quên mật khẩu rồi, thì sao mà đăng nhập để có authen đc
body: {email: string, password: string}
*/
usersRouter.post('/login-admin-staff', loginValidator, wrapAsync(loginForAdminOrStaffController))
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))
usersRouter.get('/verify-email', checkEmailToken, emailVerifyTokenValidator, wrapAsync(emailVerifyController))
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapAsync(resendEmailVerifyController))
/*
des: cung cấp email để reset password, gữi email cho người dùng
path: /forgot-password
method: POST
Header: không cần, vì  ngta quên mật khẩu rồi, thì sao mà đăng nhập để có authen đc
body: {email: string}
*/
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapAsync(forgotPasswordController))
//registerValidator là middleware để validate dữ liệu được dùng checkSchema của express-validator

/*
des: Verify link in email to reset password
path: /verify-forgot-password
method: POST
Header: không cần, vì  ngta quên mật khẩu rồi, thì sao mà đăng nhập để có authen đc
body: {forgot_password_token: string}
*/
usersRouter.get(
  '/verify-forgot-password',
  checkPasswordToken,
  verifyForgotPasswordTokenValidator,
  wrapAsync(verifyForgotPasswordTokenController)
)

/*
des: reset password
path: '/reset-password'
method: POST
Header: không cần, vì  ngta quên mật khẩu rồi, thì sao mà đăng nhập để có authen đc
body: {forgot_password_token: string, password: string, confirm_password: string}
*/
usersRouter.post('/reset-password', checkPasswordToken, resetPasswordValidator, wrapAsync(resetPasswordController))

usersRouter.get('/oauth/google', wrapAsync(oAuthController))

usersRouter.get('/get-all-user', accessTokenValidator, wrapAsync(getAllUserController))

usersRouter.get('/me', accessTokenValidator, wrapAsync(getMeController))

usersRouter.patch('/me', accessTokenValidator, updateMeValidator, wrapAsync(updateMeController))

/*
des: reset password
path: '/add-user
method: POST
Header: cần vì để check ai, có phải admin hay ko
body: {username: string, email: string, password: string, confirm_password: string}
*/
usersRouter.post('/add-user', accessTokenValidator, registerValidator, wrapAsync(addUserController))
usersRouter.post('/change-status/:id', accessTokenValidator, wrapAsync(changeStatusUserController))
usersRouter.post('/refresh-token', refreshTokenValidator, wrapAsync(refreshTokenController))

export default usersRouter
  