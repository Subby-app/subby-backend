class HttpException extends Error {
  public statusCode: number;
  public message: string;

  /**
   * @param statusCode - A valid HttpstatusCode.
   * @param message - The error message.
   */
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export { HttpException };
