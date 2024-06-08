import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

export interface RegisterReqBody {
  username: string
  email: string
  password: string
  confirm_password: string
}
//định nghĩa req cho thằng logoutController
export interface LogoutReqBody {
  refresh_token: string
}
export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}
export interface ForgotPasswordReqBody {
  email: string;
}
export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string;
}
export interface ResetPasswordReqBody {
  forgot_password_token: string
  password: string
  confirm_password: string
}