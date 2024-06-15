import { Request, Response, NextFunction } from 'express'
import { checkSchema, param } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { PRODUCTS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/model/Errors'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'
export const productValidator = validate(
  checkSchema(
    {
      brand_id: {
        notEmpty: {
          errorMessage: 'Mã hãng không được bỏ trống'
        },
        isString: {
          errorMessage: 'Mã hãng phải là chữ'
        },

        isLength: {
          options: {
            min: 3
          },
          errorMessage: 'Ten san pham phai lon hon 3 ky tu'
        },
        custom: {
          options: async (value, { req }) => {
            console.log(req.body)

            const brand = await databaseService.brands.findOne({
              _id: new ObjectId(value)
            })
            if (!brand) {
              throw new ErrorWithStatus({
                message: PRODUCTS_MESSAGES.BRAND_NOT_FOUND,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })
            }
            return true
          }
        },
        trim: true
      },
      category_id: {
        notEmpty: {
          errorMessage: 'Mã loại không được bỏ trống'
        },
        isString: {
          errorMessage: 'Mã loại phải là chữ'
        },
        trim: true,

        isLength: {
          options: {
            min: 3
          },
          errorMessage: 'Ten san pham phai lon hon 3 ky tu'
        },
        custom: {
          options: async (value, { req }) => {
            const category = await databaseService.categories.findOne({
              _id: new ObjectId(value)
            })
            if (!category) {
              throw new ErrorWithStatus({
                message: PRODUCTS_MESSAGES.CATEGORY_NOT_FOUND,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            return true
          }
        }
      },
      product_name: {
        notEmpty: {
          errorMessage: 'Tên sản phẩm không được bỏ trống'
        },
        isString: {
          errorMessage: 'Tên sản phẩm phải là chữ'
        },
        trim: true,
        isLength: {
          options: {
            min: 3
          },
          errorMessage: 'Ten san pham phai lon hon 3 ky tu'
        },
        custom: {
          options: async (value, { req }) => {
            const product = await databaseService.products.findOne({
              product_name: value
            })
            if (product) {
              throw new ErrorWithStatus({
                message: PRODUCTS_MESSAGES.PRODUCT_HAS_BEEN_EXISTED,
                status: HTTP_STATUS.UNPROCESSABLE_ENTITY
              })
            }
            return true
          }
        }
      },
      price: {
        notEmpty: {
          errorMessage: 'Giá tiền không được để trống '
        },
        isNumeric: {
          errorMessage: 'Giá tiền phải là số'
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            if (value < 0) {
              throw new Error('Giá tiền không được âm')
            }
            return true
          }
        }
      },
      description: {
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
      },
      age: {
        notEmpty: {
          errorMessage: 'Độ tuổi không được bỏ trống'
        },
        isString: {
          errorMessage: 'Dộ tuổi phải là chữ'
        },
        trim: true,

        isLength: {
          options: {
            min: 3
          },
          errorMessage: 'Dộ tuổi ít nhất 3 ký tự'
        }
      },
      discount: {
        notEmpty: false,
        isNumeric: {
          errorMessage: 'Giảm giá  phải là số'
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            if (value < 0) {
              throw new Error('Giảm giá không được âm')
            }
            return true
          }
        }
      }
      // imgUrl: {},
      // isActive: {}
    },
    ['body']
  )
)
// export const updateProductValidator = validate(
//   checkSchema(
//     {
//       brand_id: {
//         optional: true,
//         notEmpty: {
//           errorMessage: 'Mã hãng không được bỏ trống'
//         },
//         isString: {
//           errorMessage: 'Mã hãng phải là chữ'
//         },

//         isLength: {
//           options: {
//             min: 3
//           },
//           errorMessage: 'Ten san pham phai lon hon 3 ky tu'
//         },
//         custom: {
//           options: async (value, { req }) => {
//             const brand = await databaseService.brands.findOne({
//               _id: new ObjectId(value)
//             })
//             if (!brand) {
//               throw new Error('Mã hãng không tìm thấy')
//             }
//             return true
//           }
//         },
//         trim: true
//       },
//       category_id: {
//         optional: true,
//         notEmpty: {
//           errorMessage: 'Mã loại không được bỏ trống'
//         },
//         isString: {
//           errorMessage: 'Mã loại phải là chữ'
//         },
//         trim: true,

//         isLength: {
//           options: {
//             min: 3
//           },
//           errorMessage: 'Ten san pham phai lon hon 3 ky tu'
//         },
//         custom: {
//           options: async (value, { req }) => {
//             const category = await databaseService.categories.findOne({
//               _id: new ObjectId(value)
//             })
//             if (!category) {
//               throw new Error('Mã loại không tìm thấy')
//             }
//             return true
//           }
//         }
//       },
//       product_name: {
//         optional: true,
//         notEmpty: {
//           errorMessage: 'Tên sản phẩm không được bỏ trống'
//         },
//         isString: {
//           errorMessage: 'Tên sản phẩm phải là chữ'
//         },
//         trim: true,
//         isLength: {
//           options: {
//             min: 3
//           },
//           errorMessage: 'Ten san pham phai lon hon 3 ky tu'
//         }
//       },
//       price: {
//         optional: true,
//         notEmpty: {
//           errorMessage: 'Giá tiền không được để trống '
//         },
//         isNumeric: {
//           errorMessage: 'Giá tiền phải là số'
//         },
//         trim: true,
//         custom: {
//           options: async (value, { req }) => {
//             if (value < 0) {
//               throw new Error('Giá tiền không được âm')
//             }
//             return true
//           }
//         }
//       },
//       description: {
//         optional: true,
//         notEmpty: {
//           errorMessage: 'Mô tả không được bỏ trống'
//         },
//         isString: {
//           errorMessage: 'Mô tả phải là chữ'
//         },
//         trim: true,

//         isLength: {
//           options: {
//             min: 3
//           },
//           errorMessage: 'Mô tả ít nhất 3 ký tự'
//         }
//       },
//       age: {
//         optional: true,
//         notEmpty: {
//           errorMessage: 'Độ tuổi không được bỏ trống'
//         },
//         isString: {
//           errorMessage: 'Dộ tuổi phải là chữ'
//         },
//         trim: true,

//         isLength: {
//           options: {
//             min: 3
//           },
//           errorMessage: 'Dộ tuổi ít nhất 3 ký tự'
//         }
//       },
//       discount: {
//         optional: true,
//         notEmpty: false,
//         isNumeric: {
//           errorMessage: 'Giảm giá  phải là số'
//         },
//         trim: true,
//         custom: {
//           options: async (value, { req }) => {
//             if (value < 0) {
//               throw new Error('Giảm giá không được âm')
//             }
//             return true
//           }
//         }
//       },
//       imgUrl: {
//         optional: true
//       },
//       isActive: {
//         optional: true
//       }
//     },
//     ['body']
//   )
// )
// export const isParamsIdValidator = param('id')
//   .notEmpty()
//   .withMessage('ID không được bỏ trống')
//   .isMongoId()
//   .withMessage('ID không hợp lệ')
export const updateProductValidator =
  // Validator for the body
  validate(
    checkSchema(
      {
        brand_id: {
          optional: true,
          notEmpty: {
            errorMessage: 'Mã hãng không được bỏ trống'
          },
          isString: {
            errorMessage: 'Mã hãng phải là chữ'
          },
          isLength: {
            options: {
              min: 3
            },
            errorMessage: 'Tên sản phẩm phải lớn hơn 3 ký tự'
          },
          custom: {
            options: async (value, { req }) => {
              const brand = await databaseService.brands.findOne({
                _id: new ObjectId(value)
              })
              if (!brand) {
                throw new Error('Mã hãng không tìm thấy')
              }
              return true
            }
          },
          trim: true
        },
        category_id: {
          optional: true,
          notEmpty: {
            errorMessage: 'Mã loại không được bỏ trống'
          },
          isString: {
            errorMessage: 'Mã loại phải là chữ'
          },
          trim: true,
          isLength: {
            options: {
              min: 3
            },
            errorMessage: 'Tên sản phẩm phải lớn hơn 3 ký tự'
          },
          custom: {
            options: async (value, { req }) => {
              const category = await databaseService.categories.findOne({
                _id: new ObjectId(value)
              })
              if (!category) {
                throw new Error('Mã loại không tìm thấy')
              }
              return true
            }
          }
        },
        product_name: {
          optional: true,
          notEmpty: {
            errorMessage: 'Tên sản phẩm không được bỏ trống'
          },
          isString: {
            errorMessage: 'Tên sản phẩm phải là chữ'
          },
          trim: true,
          isLength: {
            options: {
              min: 3
            },
            errorMessage: 'Tên sản phẩm phải lớn hơn 3 ký tự'
          }
        },
        price: {
          optional: true,
          notEmpty: {
            errorMessage: 'Giá tiền không được để trống'
          },
          isNumeric: {
            errorMessage: 'Giá tiền phải là số'
          },
          trim: true,
          custom: {
            options: async (value, { req }) => {
              if (value < 0) {
                throw new Error('Giá tiền không được âm')
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
        },
        age: {
          optional: true,
          notEmpty: {
            errorMessage: 'Độ tuổi không được bỏ trống'
          },
          isString: {
            errorMessage: 'Độ tuổi phải là chữ'
          },
          trim: true,
          isLength: {
            options: {
              min: 3
            },
            errorMessage: 'Độ tuổi ít nhất 3 ký tự'
          }
        },
        discount: {
          optional: true,
          notEmpty: false,
          isNumeric: {
            errorMessage: 'Giảm giá phải là số'
          },
          trim: true,
          custom: {
            options: async (value, { req }) => {
              if (value < 0) {
                throw new Error('Giảm giá không được âm')
              }
              return true
            }
          }
        },
        imgUrl: {
          optional: true
        },
        isActive: {
          optional: true
        }
      },
      ['body']
    )
  )

export const isParamsIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {
          errorMessage: 'Mã sản phẩm không được bỏ trống'
        },
        isString: {
          errorMessage: 'Mã sản phẩm phải là chữ'
        },
        isMongoId: {
          errorMessage: 'Mã sản phẩm không hợp lệ'
        },
        trim: true
      }
    },
    ['params']
  )
)
