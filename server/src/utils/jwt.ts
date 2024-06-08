import jwt, { TokenExpiredError } from 'jsonwebtoken'
//privateKey là password để được quyền tạo chữ ký jwt
import { config } from 'dotenv'
import { TokenPayload } from '~/model/requests/User.requests'
import { ErrorWithStatus } from '~/model/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
config()
export const signToken = ({
  payload,
  privateKey,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privateKey: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}
//
// hàm kiểm tra token có phải của mình tạo ra ko
//nếu có thì trả ra payload
// không thì ... ném lỗi
export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) {
        if (error instanceof TokenExpiredError) {
          return reject(
            new ErrorWithStatus({
              message: 'Token đã hết hạn',
              status: HTTP_STATUS.UNAUTHORIZED // 401
            })
          )
        }
        return reject(error)
      }
      // if (error) throw reject(error)
      resolve(decoded as TokenPayload)
    })
  })
}

export function hashToSixDigit() {
  // Bước 1: Mã hóa chuỗi thành SHA-256
  // const sha256Hash = crypto.createHash('sha256').update(inputString).digest('hex');

  // Bước 2: Chuyển đổi mã băm thành số nguyên lớn (big integer)
  let sixDigit = ''
  for (let index = 0; index <= 5; index++) {
    sixDigit += getRandomInt(0, 9)
  }


  // Bước 3: Chuyển đổi số nguyên lớn thành chuỗi và lấy 6 ký tự đầu tiên

  return sixDigit
}
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}
