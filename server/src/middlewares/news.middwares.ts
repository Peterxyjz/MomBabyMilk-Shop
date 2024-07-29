import { checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/model/Errors'
import databaseService from '~/services/database.services'
import productsService from '~/services/products.services'
import usersService from '~/services/users.services'
import { validate } from '~/utils/validation'

export const uploadNewsValidator =
  // Validator for the body
  validate(
    checkSchema(
      {
        product_id: {
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

        news_name: {
          notEmpty: {
            errorMessage: 'Tên không được bỏ trống'
          },
          isString: {
            errorMessage: 'Tênphải là chữ'
          },
          trim: true
        },

        description: {
          notEmpty: {
            errorMessage: 'Mô tả không được bỏ trống'
          },
          isString: {
            errorMessage: 'Mô tả phải là chữ'
          },
          trim: true
        }
      },
      ['body']
    )
  )

export const updateNewsValidator =
  // Validator for the body
  validate(
    checkSchema(
      {
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

        news_name: {
          optional: true,
          notEmpty: {
            errorMessage: 'Tên không được bỏ trống'
          },
          isString: {
            errorMessage: 'Tênphải là chữ'
          },
          trim: true
        },

        description: {
          optional: true,
          notEmpty: {
            errorMessage: 'Mô tả không được bỏ trống'
          },
          isString: {
            errorMessage: 'Mô tả phải là chữ'
          },
          trim: true
        }
      },
      ['body']
    )
  )
