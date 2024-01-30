export class ApiException extends Error {
  public status: number;
  public errors?: { message: string; [key: string]: any };
  public isOperational: boolean;

  /**
   *
   * @param {number} httpStatusCode
   * @param {{ message: string, [key: string]: * }} [errors]
   * @param {boolean} [isOperational]
   */
  constructor(
    httpStatusCode: number,
    errors?: { message: string; [key: string]: any },
    isOperational: boolean = true,
  ) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = httpStatusCode;
    this.errors = errors;
    this.isOperational = isOperational;

    Error?.captureStackTrace(this, this.constructor);
  }
}
