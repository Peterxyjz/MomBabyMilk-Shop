import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/model/Errors'

//export ở ngoài xài đc hàm validate
//hàm validate có 2 cách xài:
//  1 - giống như  mẫu xài trực tiếp trên validationChain như này post('/signup', validate([ body('email').isEmail(), ...])
//      vậy thì khai báo sẽ là const validate = (validations: ValidationChain[]) => {

//  2 - nhưng ở đây ta xài checkSchema,  checkSchema sẽ return ra RunnableValidationChains<ValidationChain>
// nên khai báo sẽ như dưới đây
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }
    const errorObject = errors.mapped()
    const entityError = new EntityError({ errors: {} }) //entityError dùng để thay thế errorObject

    for (const key in errorObject) {
      const { msg } = errorObject[key]
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      // nếu lỗi phát sinh không dạng ErrorWithStatus và có status 422 thì thêm vào entityError với công thức đã nói trước đó
      entityError.errors[key] = msg
    }
    //sau khi tổng hợp xong thì ném ra cho defaultErrorHandler xử lý
    next(entityError)
  }
}
