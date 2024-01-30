import { ApiException } from './api.exception';

/**
 *
 * @param {number} statusCode
 * @param {string} message
 * @param {message} string}
 */
export class UnauthorizedException extends ApiException {
  constructor(error: { message: string }) {
    super(401, error);
  }
}
