import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'
export const brandsValidator = validate(
  checkSchema(
    {
      brand_name: {
        notEmpty: {
          errorMessage: 'tên không được bỏ trống'
        },
        isString: {
          errorMessage: 'Tên phải là chữ'
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const brand = await databaseService.brands.findOne({
              brand_name: value
            })
            if (brand !== null) {
              throw new Error('Brand name đã tồn tại ')
            }

            return true
          }
        }
      },
      address: {
        notEmpty: {
          errorMessage: 'Địa chỉ không được bỏ trống'
        },
        isString: {
          errorMessage: 'Địa chỉ phải là chữ'
        }
      },
      country: {
        notEmpty: {
          errorMessage: 'Country không được bỏ trống'
        },
        isString: {
          errorMessage: 'Country phải là chữ'
        }
      },
      phone: {
        notEmpty: {
          errorMessage: 'Số điện thoại không được bỏ trống'
        },
        isString: {
          errorMessage: 'Số điện thoại là số'
        },
        isLength: {
          options: {
            min: 10
          },
          errorMessage: 'Số điện thoại phải là 10 số'
        },
        custom: {
          options: (value) => {
            if (isNaN(value)) {
              throw new Error('Số điện thoại phải là số')
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const updateBrandsValidator = validate(
  checkSchema(
    {
      brand_name: {
        optional: true,
        notEmpty: {
          errorMessage: 'tên không được bỏ trống'
        },
        isString: {
          errorMessage: 'Tên phải là chữ'
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const category = await databaseService.categories.findOne({
              category_name: value
            })
            if (category === null) {
              throw new Error('đã tồn tại ')
            }
            req.user = category // lưu user vào req để dùng ở loginController
            return true
          }
        }
      },
      address: {
        optional: true,
        notEmpty: {
          errorMessage: 'Địa chỉ không được bỏ trống'
        },
        isString: {
          errorMessage: 'Địa chỉ phải là chữ'
        }
      },
      country: {
        optional: true,
        notEmpty: {
          errorMessage: 'Country không được bỏ trống'
        },
        isString: {
          errorMessage: 'Country phải là chữ'
        }
      },
      phone: {
        optional: true,
        notEmpty: {
          errorMessage: 'Số điện thoại không được bỏ trống'
        },
        isString: {
          errorMessage: 'Số điện thoại là số'
        },
        isLength: {
          options: {
            min: 10
          },
          errorMessage: 'Số điện thoại phải là 10 số'
        },
        custom: {
          options: (value) => {
            if (isNaN(value)) {
              throw new Error('Số điện thoại phải là số')
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const getBrandValidator = validate(
  checkSchema(
    {
      _id: {
        notEmpty: {
          errorMessage: 'Mã loại không được bỏ trống'
        },
        isString: {
          errorMessage: 'Mã loại phải là chữ'
        }
      }
    },
    ['params']
  )
)
