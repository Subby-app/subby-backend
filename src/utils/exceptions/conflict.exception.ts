import { ApiException } from './api.exception';

/**
 *
 * @param {number} statusCode
 * @param {string} message
 */
export class ConflictException extends ApiException {
  constructor(error: { message: string }) {
    super(409, error);
  }
}
