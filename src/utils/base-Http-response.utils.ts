export class BaseHttpResponse {
  public success: boolean;
  public message?: string;
  public data?: any;
  public error?: any;

  /**
   *
   * @param {boolean} success
   * @param {string} message
   * @param {*} data
   * @param {*} errors
   */
  constructor(success: boolean, message: string, data?: any, errors?: any) {
    this.success = success;
    this.message = message === '' ? undefined : message;
    this.data = data;
    this.error = errors;
  }

  /**
   *
   * @param {string} message
   * @param {*} data
   * @returns {BaseHttpResponse}
   */
  static success(message: string, data?: any): BaseHttpResponse {
    return new BaseHttpResponse(true, message, data, undefined);
  }

  /**
   *
   * @param {string} message
   * @param {*} errors
   * @returns {BaseHttpResponse}
   */
  static failed(message: string, errors?: any): BaseHttpResponse {
    return new BaseHttpResponse(false, message, undefined, errors);
  }
}
