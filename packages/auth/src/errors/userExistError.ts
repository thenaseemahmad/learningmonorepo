import { CustomError } from "./customError";

export default class UserExistError extends CustomError {
  statusCode: number = 400;
  error: string;
  constructor(error: string) {
    super()
    this.error = error;
    Object.setPrototypeOf(this, UserExistError.prototype);
  }
  serializeError(): { message: string; field?: string; }[] {
    return [{ message: this.error }]
  }
}