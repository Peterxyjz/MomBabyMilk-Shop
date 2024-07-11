import { Router } from 'express'
import {
  accessTokenValidator,
  changePasswordValidator,
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
  changePasswordController,
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
/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: Đăng nhập
 *     description: Logs user into the system
 *     operationId: login
 *     requestBody:
 *       description: Thông tin đăng nhập
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginBody'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đăng nhập thành công
 *                 result:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjY2YTlhMWE2MWNkYjhhMjQ4YWUzZTI1IiwidG9rZW5fdHlwZSI6MCwiaWF0IjoxNzIwNjg4ODQ0LCJleHAiOjE3MjA3NzUyNDR9.sG9LT8ezoDerVGTXXo71yOaHKyEOXvWynFAeCvK0JwA
 *                     refresh_token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjY2YTlhMWE2MWNkYjhhMjQ4YWUzZTI1IiwidG9rZW5fdHlwZSI6MSwiaWF0IjoxNzIwNjg4ODQ0LCJleHAiOjE3MjA3NzUyNDR9.nuO3u0H89icbfxuxCa-CyvDDawqc1DV0T0n-NdYbBNY
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '422':
 *         description: Invalid email/password supplied
 */


usersRouter.post('/login', loginValidator, wrapAsync(loginController))



usersRouter.post('/register', registerValidator, wrapAsync(registerController))
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

usersRouter.patch(
  '/change-password',
  accessTokenValidator,
  changePasswordValidator,
  wrapAsync(changePasswordController)
)
usersRouter.get('/oauth/google', wrapAsync(oAuthController))

usersRouter.get('/get-all-user', accessTokenValidator, wrapAsync(getAllUserController))



/**
 * @openapi
 * /users/me:
 *   get:
 *     tags:
 *       - users
 *     summary: Lấy thông tin user
 *     description: Lấy thông tin user
 *     operationId: getMe
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lấy thông tin thành công
 *                 result:
 *                   $ref: '#/components/schemas/User'
 *       '422':
 *         description: Invalid email/password supplied
 */
usersRouter.get('/me', accessTokenValidator, wrapAsync(getMeController))


usersRouter.patch('/me', accessTokenValidator, updateMeValidator, wrapAsync(updateMeController))


usersRouter.post('/add-user', accessTokenValidator, registerValidator, wrapAsync(addUserController))
usersRouter.post('/change-status/:id', accessTokenValidator, wrapAsync(changeStatusUserController))
usersRouter.post('/refresh-token', refreshTokenValidator, wrapAsync(refreshTokenController))


//todo========================schema===========================openapi=======================

/** get-me
 * 
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: MongoId
 *           example: 666a9a1a61cdb8a248ae3e25
 *         role_id: 
 *           type: string
 *           example: 6649cbd320733271d0ff89a5
 *         full_name: 
 *           type: string
 *           example: Phong Siêu Đẹp Traii
 *         email:
 *           type: string
 *           example: phong@gmail.com
 *         date_of_birth:
 *           type: string
 *           example: 2022-06-21T06:15:10.118Z
 *         password:
 *           type: string
 *           example: 6a9cd97a489ad946e48590c9f7248390129d7211260627874bac56372be0629c
 *         country:
 *           type: string
 *           example: ""
 *         province:
 *           type: string
 *           example: 11
 *         district:
 *           type: string
 *           example: 101
 *         ward:
 *           type: string
 *           example: 3376
 *         address:
 *           type: string
 *           example: 132/1212 Phan Lâm1, Xã Định Hiệp, Huyện Dựng Tiếng, Bình Dương
 *         phone:
 *           type: string
 *           example: 0907089079
 *         username:
 *           type: string  
 *           example: Phong Siêu Đẹp Traii
 *         email_verify_token:
 *           type: string
 *           example: ""
 *         forgot_password_token:
 *           type: string
 *           example: ""
 *         verify:
 *           $ref: '#/components/schemas/UserVerifyStatus'
 *           example: 1
 *         isActive:
 *           type: integer
 *           example: 1
 *         updated_at:
 *           type: string
 *           example: 2024-06-21T06:15:10.118Z
 *         member_ship:
 *           type: integer
 *           example: 861210
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: phong@gmail.com
 *         password:
 *           type: string
 *           example: Admin12345@
 *     UserVerifyStatus:
 *       type: number
 *       enum:
 *         - Unverified
 *         - Verified
 *         - Banned
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export default usersRouter
