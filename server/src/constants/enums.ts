export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}
export enum TokenType {
  AccessToken, //0
  RefreshToken, //1
  ForgotPasswordToken, //2
  EmailVerificationToken //3
}
export enum UserAccountStatus {
  Blocked,
  Actived
}
export enum OrderStatus {
  Required,
  Processing,
  Completed,
  Cancel
}
export enum ProductStatus {
  Available,
  Unavailable
}
export enum RevenueStatus {
  InputBill,
  Order
}
