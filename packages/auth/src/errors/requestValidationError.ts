import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
  errors: ValidationError[];
  statusCode: number = 400;
  constructor(errors: ValidationError[]) {
    super()
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    const errObj = this.errors.map((error) => {
      return { message: error.msg }
    });
    return errObj;
  }
}