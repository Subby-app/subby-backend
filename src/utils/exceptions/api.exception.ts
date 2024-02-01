export class ApiException extends Error {
  title: string;
  status: number;
  errors: string;
  isOperational: boolean;

  constructor(httpStatusCode: number, title: string, errors: string, isOperational = true) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    this.title = title;
    this.status = httpStatusCode;
    this.errors = errors;
    this.isOperational = isOperational;

    Error?.captureStackTrace(this, this.constructor);
  }
}
