export class ApiException extends Error {
  status: number;
  errors: string;

  constructor(httpStatusCode: number, errors: string) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = httpStatusCode;
    this.errors = errors;

    Error?.captureStackTrace(this, this.constructor);
  }
}
