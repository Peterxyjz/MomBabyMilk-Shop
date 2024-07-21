import { checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/model/Errors'
import productsService from '~/services/products.services'
import usersService from '~/services/users.services'
import { validate } from '~/utils/validation'

export const updateFeedBackValidator =
  // Validator for the body
  validate(
    checkSchema(
      {
        user_id: {
          optional: true,
          notEmpty: {
            errorMessage: 'Mã không được bỏ trống'
          },
          isString: {
            errorMessage: 'Mã phải là chữ'
          },
          isLength: {
            options: {
              min: 3
            },
            errorMessage: 'Mã phải là 1 ObjectId'
          },
          custom: {
            options: async (value, { req }) => {
              const user = await usersService.getById(value)
              if (!user) {
                throw new ErrorWithStatus({
                  message: USERS_MESSAGES.USER_NOT_FOUND,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }
              return true
            }
          },
          trim: true
        },
        product_id: {
          optional: true,
          notEmpty: {
            errorMessage: 'Mã sản phẩm không được bỏ trống'
          },
          isString: {
            errorMessage: 'Mã phải là chữ'
          },
          custom: {
            options: async (value, { req }) => {
              const product = await productsService.getById(value)
              if (!product) {
                throw new Error('Mã hãng không tìm thấy')
              }
              return true
            }
          }
        },
        rating: {
          optional: true,
          isInt: {
            options: {
              min: 0,
              max: 5
            },
            errorMessage: 'Điểm đánh giá từ 0 đến 5'
          }
        },
        description: {
          optional: true,
          notEmpty: {
            errorMessage: 'Mô tả không được bỏ trống'
          },
          isString: {
            errorMessage: 'Mô tả phải là chữ'
          },
          trim: true,
          isLength: {
            options: {
              min: 3
            },
            errorMessage: 'Mô tả ít nhất 3 ký tự'
          }
        }
      },
      ['body']
    )
  )

export const updateReplyFeedBackValidator =
  // Validator for the body
  validate(
    checkSchema(
      {
        user_id: {
          optional: true,
          notEmpty: {
            errorMessage: 'Mã không được bỏ trống'
          },
          isString: {
            errorMessage: 'Mã phải là chữ'
          },
          isLength: {
            options: {
              min: 3
            },
            errorMessage: 'Mã phải là 1 ObjectId'
          },
          custom: {
            options: async (value, { req }) => {
              const user = await usersService.getById(value)
              if (!user) {
                throw new ErrorWithStatus({
                  message: USERS_MESSAGES.USER_NOT_FOUND,
                  status: HTTP_STATUS.UNPROCESSABLE_ENTITY
                })
              }
              return true
            }
          },
          trim: true
        },
        product_id: {
          optional: true,
          notEmpty: {
            errorMessage: 'Mã sản phẩm không được bỏ trống'
          },
          isString: {
            errorMessage: 'Mã phải là chữ'
          },
          custom: {
            options: async (value, { req }) => {
              const product = await productsService.getById(value)
              if (!product) {
                throw new Error('Mã hãng không tìm thấy')
              }
              return true
            }
          }
        },
        description: {
          optional: true,
          notEmpty: {
            errorMessage: 'Mô tả không được bỏ trống'
          },
          isString: {
            errorMessage: 'Mô tả phải là chữ'
          },
          trim: true,
          isLength: {
            options: {
              min: 3
            },
            errorMessage: 'Mô tả ít nhất 3 ký tự'
          }
        }
      },
      ['body']
    )
  )
