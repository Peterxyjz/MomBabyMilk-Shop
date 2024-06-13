export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Lỗi xác thực',
  //name
  NAME_IS_REQUIRED: 'Tên là bắt buộc',
  NAME_MUST_BE_A_STRING: 'Tên phải là một chuỗi',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Độ dài tên phải từ 1 đến 100 ký tự',
  //email
  EMAIL_ALREADY_EXISTS: 'Email đã tồn tại',
  EMAIL_IS_REQUIRED: 'Email là bắt buộc',
  EMAIL_IS_INVALID: 'Email không hợp lệ',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Mã xác minh email là bắt buộc',
  USER_NOT_FOUND: 'Không tìm thấy người dùng',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email đã được xác minh trước đó',
  EMAIL_VERIFY_SUCCESS: 'Xác minh email thành công',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Gửi lại email xác minh thành công',
  YOU_NEED_TO_VERIFY_EMAIL: 'Bạn cần xác minh email để tiếp tục đăng nhập',
  OTP_IS_INVALID: 'Mã xác minh không hợp lệ',
  EMAIL_NOT_VERIFIED: 'Email chưa xác minh',
  //password
  PASSWORD_IS_REQUIRED: 'Mật khẩu là bắt buộc',
  PASSWORD_MUST_BE_A_STRING: 'Mật khẩu phải là một chuỗi',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Độ dài mật khẩu phải từ 8 đến 50 ký tự',
  PASSWORD_MUST_BE_STRONG:
    'Mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 chữ số và 1 ký tự đặc biệt',
  //confirmPassword
  CONFIRM_PASSWORD_IS_REQUIRED: 'Xác nhận mật khẩu là bắt buộc',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Xác nhận mật khẩu phải là một chuỗi',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Độ dài xác nhận mật khẩu phải từ 8 đến 50 ký tự',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Xác nhận mật khẩu phải dài ít nhất 8 ký tự và chứa ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 chữ số và 1 ký tự đặc biệt',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Xác nhận mật khẩu phải giống với mật khẩu',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Kiểm tra email để đặt lại mật khẩu',

  //Forgot-password
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Mã token để quên mật khẩu là bắt buộc',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Mã token để quên mật khẩu không hợp lệ',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Xác minh mã token để quên mật khẩu thành công',

  //Reset-password
  RESET_PASSWORD_SUCCESS: 'Đặt lại mật khẩu thành công',

  //dateOfBirth
  DATE_OF_BIRTH_BE_ISO8601: 'Ngày sinh phải theo định dạng ISO8601',
  //user
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email hoặc mật khẩu không đúng',
  //login:
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  REGISTER_SUCCESS: 'Đăng ký thành công',
  LOGIN_FAIL: 'Đăng nhập với quyền admin hoặc staff thất bại',
  //logout:
  ACCESS_TOKEN_IS_REQUIRED: 'Access token là bắt buộc',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token là bắt buộc',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token không hợp lệ',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Refresh token đã được sử dụng hoặc không tồn tại',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  //CRUD
  //upload:
  UPLOAD_SUCCESS: 'Upload thành công',
  UPLOAD_FAIL: 'Upload thật bài',
  //get:
  GET_SUCCESS: 'Lấy thành công',
  GET_FAIL: 'Lấy thất bại',
  //update:
  UPDATE_SUCCESS: 'Cập nhật thành công',
  UPDATE_FAIL: 'Cập nhật thất bại',
  //delete:
  DELETE_SUCCESS: 'Xóa thành công',
  DELETE_FAIL: 'Xóa thất bại'
} as const


export const PRODUCTS_MESSAGES = {
  PRODUCT_HAS_BEEN_EXISTED: 'Sản phẩm đã tồn tại',
  BRAND_NOT_FOUND: 'Không tìm thấy hãng',
  CATEGORY_NOT_FOUND: 'Không tìm thấy danh mục'
}