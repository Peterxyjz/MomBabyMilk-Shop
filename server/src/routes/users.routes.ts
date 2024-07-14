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
/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - users
 *     summary: Đăng ký tài khoản
 *     description: Registers a new user with email, username, password, and password confirmation.
 *     operationId: registerUser
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd123
 *               confirm_password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd123
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f5f64c4d5f8b23dcecc9f2"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     username:
 *                       type: string
 *                       example: "user123"
 *       '400':
 *         description: Invalid input data or passwords do not match
 *       '500':
 *         description: Internal server error
 */
usersRouter.post('/register', registerValidator, wrapAsync(registerController))

/**
 * @swagger
 * /users/login-admin-staff:
 *   post:
 *     tags:
 *       - users
 *     summary: Đăng nhập bằng Admin/Staff
 *     description: Authenticates an admin or staff member with email and password.
 *     operationId: loginAdminStaff
 *     requestBody:
 *       description: Admin/Staff login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Admin@1234
 *     responses:
 *       '200':
 *         description: Login successful, returns authentication token and user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f5f64c4d5f8b23dcecc9f2"
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     username:
 *                       type: string
 *                       example: "adminUser"
 *       '400':
 *         description: Invalid email or password
 *       '500':
 *         description: Internal server error
 */

usersRouter.post('/login-admin-staff', loginValidator, wrapAsync(loginForAdminOrStaffController))

/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags:
 *       - users
 *     summary: Đăng xuất
 *     description: Logs out a user by invalidating the refresh token.
 *     operationId: logoutUser
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Refresh token to be invalidated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *     responses:
 *       '200':
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 *       '400':
 *         description: Invalid refresh token
 *       '500':
 *         description: Internal server error
 */

usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

/**
 * @swagger
 * /users/verify-email:
 *   get:
 *     tags:
 *       - users
 *     summary: Xác thực email
 *     description: Verifies the user’s email address using a verification code sent to the email.
 *     operationId: verifyUserEmail
 *     parameters:
 *       - name: user_id
 *         in: query
 *         description: The ID of the user whose email is to be verified.
 *         required: true
 *         schema:
 *           type: string
 *           example: "66924010f6c135a00f618337"
 *       - name: digit
 *         in: query
 *         description: The verification code sent to the user's email.
 *         required: true
 *         schema:
 *           type: string
 *           example: "564241"
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email verified successfully"
 *       '400':
 *         description: Invalid user ID or verification code
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

usersRouter.get('/verify-email', checkEmailToken, emailVerifyTokenValidator, wrapAsync(emailVerifyController))

/**
 * @swagger
 * /users/resend-verify-email:
 *   post:
 *     tags:
 *       - users
 *     summary: Gửi lại mã xác thực email
 *     description: Resends the email verification code to the user’s email address.
 *     operationId: resendVerifyEmail
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Verification email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Verification email sent successfully"
 *       '400':
 *         description: Invalid user ID
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

usersRouter.post('/resend-verify-email', accessTokenValidator, wrapAsync(resendEmailVerifyController))
/*
des: cung cấp email để reset password, gữi email cho người dùng
path: /forgot-password
method: POST
Header: không cần, vì  ngta quên mật khẩu rồi, thì sao mà đăng nhập để có authen đc
body: {email: string}
*/
/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     tags:
 *       - users
 *     summary: Yêu cầu đổi mật khẩu
 *     description: Sends a password reset link to the specified email address if it exists in the system.
 *     operationId: forgotPassword
 *     requestBody:
 *       description: Email address of the user requesting a password reset.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       '200':
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset link sent successfully"
 *       '400':
 *         description: Invalid email address or email not provided
 *       '404':
 *         description: Email address not found
 *       '500':
 *         description: Internal server error
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
/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     tags:
 *       - users
 *     summary: Thay đổi mật khẩu
 *     description: Allows a user to reset their password using a verification code sent to their email.
 *     operationId: resetPassword
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: 66924010f6c135a00f618337
 *       - name: digit
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: 685868
 *     requestBody:
 *       description: New password and confirmation password for resetting.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewPassword123
 *               confirm_password:
 *                 type: string
 *                 format: password
 *                 example: NewPassword123
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *       '400':
 *         description: Invalid input or passwords do not match
 *       '404':
 *         description: User not found or invalid verification code
 *       '500':
 *         description: Internal server error
 */

usersRouter.post('/reset-password', checkPasswordToken, resetPasswordValidator, wrapAsync(resetPasswordController))

/**
 * @swagger
 * /users/change-password:
 *   patch:
 *     tags:
 *       - users
 *     summary: Thay đổi mật khẩu trực tiếp
 *     description: Allows a logged-in user to change their password.
 *     operationId: changePassword
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Old password and new password for changing.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewPassword123
 *               confirm_password:
 *                 type: string
 *                 format: password
 *                 example: NewPassword123
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *       '400':
 *         description: Invalid input, passwords do not match, or old password is incorrect
 *       '401':
 *         description: Unauthorized or old password is incorrect
 *       '500':
 *         description: Internal server error
 */

usersRouter.patch(
  '/change-password',
  accessTokenValidator,
  changePasswordValidator,
  wrapAsync(changePasswordController)
)
usersRouter.get('/oauth/google', wrapAsync(oAuthController))

/**
 * @swagger
 * /users/get-all-user:
 *   get:
 *     tags:
 *       - users
 *     summary: Lấy tất cả tài khoản người dùng
 *     description: Retrieves a list of all users.
 *     operationId: getAllUsers
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
 *                   example: "Users retrieved successfully"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "665eb7c90ce5ff95033f7ead"
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       username:
 *                         type: string
 *                         example: "username123"
 *                       full_name:
 *                         type: string
 *                         example: "John Doe"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /users/me:
 *   patch:
 *     tags:
 *       - users
 *     summary: Cập nhật profile
 *     description: Allows users to update their own profile information.
 *     operationId: updateUserProfile
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User profile details to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "Phong Siêu Xấu Traii"
 *               phone:
 *                 type: string
 *                 example: "0907089079"
 *               address:
 *                 type: string
 *                 example: "132/1212 Phan Lâm, Xã Định Hiệp, Huyện Dầu Tiếng, Bình Dương"
 *               date_of_birth:
 *                 type: string
 *                 format: date-time
 *                 example: "2003-01-10T17:00:00.000Z"
 *               username:
 *                 type: string
 *                 example: "Phong Siêu Đẹp Traii"
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
 *                   example: "Profile updated successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "665eb7c90ce5ff95033f7ead"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     full_name:
 *                       type: string
 *                       example: "John Doe"
 *                     phone:
 *                       type: string
 *                       example: "1234567890"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, Anytown, USA"
 *                     date_of_birth:
 *                       type: string
 *                       format: date
 *                       example: "1990-01-01"
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *       '400':
 *         description: Bad request, invalid input
 *       '401':
 *         description: Unauthorized, invalid token
 *       '500':
 *         description: Internal server error
 */

usersRouter.patch('/me', accessTokenValidator, updateMeValidator, wrapAsync(updateMeController))

/**
 * @swagger
 * /users/add-user:
 *   post:
 *     tags:
 *       - users
 *     summary: Thêm nhân viên
 *     description: Allows the creation of a new user with the provided details.
 *     operationId: addUser
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User details to create a new account
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "Phong Siêu Xấu Traii"
 *               email:
 *                 type: string
 *                 example: "phong@gmail.com"
 *               date_of_birth:
 *                 type: string
 *                 format: date-time
 *                 example: "2003-01-10T17:00:00.000Z"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               confirm_password:
 *                 type: string
 *                 example: "securePassword123"
 *               country:
 *                 type: string
 *                 example: "Việt Nam"
 *               province:
 *                 type: string
 *                 example: "Bình Dương"
 *               district:
 *                 type: string
 *                 example: "Dầu Tiếng"
 *               ward:
 *                 type: string
 *                 example: "Định Hiệp"
 *               address:
 *                 type: string
 *                 example: "132/1212 Phan Lâm1, Định Hiệp, Dầu Tiếng, Bình Dương"
 *               phone:
 *                 type: string
 *                 example: "0907089079"
 *               membership:
 *                 type: integer
 *                 example: 0
 *               username:
 *                 type: string
 *                 example: "Phong_Siêu_Đẹp_Traii"
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-07-13T10:00:00.000Z"
 *     responses:
 *       '201':
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "665eb7c90ce5ff95033f7ead"
 *                     full_name:
 *                       type: string
 *                       example: "Phong Siêu Xấu Traii"
 *                     email:
 *                       type: string
 *                       example: "phong@gmail.com"
 *                     date_of_birth:
 *                       type: string
 *                       format: date-time
 *                       example: "2003-01-10T17:00:00.000Z"
 *                     address:
 *                       type: string
 *                       example: "132/1212 Phan Lâm1, Định Hiệp, Dầu Tiếng, Bình Dương"
 *                     phone:
 *                       type: string
 *                       example: "0907089079"
 *                     username:
 *                       type: string
 *                       example: "Phong_Siêu_Đẹp_Traii"
 *                     membership:
 *                       type: integer
 *                       example: 0
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-13T10:00:00.000Z"
 *       '400':
 *         description: Bad request, invalid input
 *       '500':
 *         description: Internal server error
 */

usersRouter.post('/add-user', accessTokenValidator, registerValidator, wrapAsync(addUserController))

/**
 * @swagger
 * /users/change-status/{id}:
 *   post:
 *     tags:
 *       - users
 *     summary:  Thay đổi trạng thái tài khoản
 *     description: Allows updating the status of a user based on their ID.
 *     operationId: changeUserStatus
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user whose status is to be updated
 *         schema:
 *           type: string
 *           example: "66924010f6c135a00f618337"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Thay đổi trạng thái tài khoản thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User status updated successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66924010f6c135a00f618337"
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *       '400':
 *         description: Bad request, invalid input
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

usersRouter.post('/change-status/:id', accessTokenValidator, wrapAsync(changeStatusUserController))

/**
 * @swagger
 * /users/refresh-token:
 *   post:
 *     tags:
 *       - users
 *     summary: Cập nhật token
 *     description: Allows users to refresh their access token using a refresh token.
 *     operationId: refreshToken
 *     requestBody:
 *       description: Refresh token to obtain a new access token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 description: The refresh token to use for obtaining a new access token
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       '200':
 *         description: Successfully obtained a new access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: The new access token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 expires_in:
 *                   type: integer
 *                   description: The duration (in seconds) until the access token expires
 *                   example: 3600
 *       '400':
 *         description: Bad request, invalid refresh token
 *       '401':
 *         description: Unauthorized, refresh token is invalid or expired
 *       '500':
 *         description: Internal server error
 */

usersRouter.post('/refresh-token', refreshTokenValidator, wrapAsync(refreshTokenController))

/** get-me
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
