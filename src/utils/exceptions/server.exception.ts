import { ApiException } from './api.exception';

export class ServerException extends ApiException {
  /**
   *
   * @param {{ message: string, [key: string]: any }} errors
   * @param {Error} [innerException]
   * @param {string} [title='Unable to Process Request']
   */
  public innerException?: Error;

  constructor(
    errors: { message: string; [key: string]: any },
    innerException?: Error,
    title: string = 'Unable to Process Request',
  ) {
    super(500, title, errors);
    this.innerException = innerException;
  }
}
