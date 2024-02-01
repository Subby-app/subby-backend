import { ApiException } from './api.exception';

/**
 *
 * @param {number} statusCode
 * @param {string} message
 */
export class UnauthorizedException extends ApiException {
  constructor(error: { message: string }) {
    super(401, 'Unauthorized', error.message);
  }
}
