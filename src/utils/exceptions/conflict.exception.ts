import { ApiException } from './api.exception';

/**
 *
 * @param {number} statusCode
 * @param {string} message
 * @param {message} string}
 */
export class ConflictException extends ApiException {
  constructor(error: { message: string }, title: string = 'Resource Conflict Detected') {
    super(409, title, error);
  }
}
