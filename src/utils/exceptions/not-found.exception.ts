import { ApiException } from './api.exception';

/**
 *
 * @param {number} statusCode
 * @param {string} message
 * @param {message} string}
 */
export class NotFoundException extends ApiException {
  constructor(
    error: string | { message: string; path: string },
    title: string = 'Requested resource not found',
  ) {
    const err = typeof error === 'string' ? { message: error } : error;
    super(404, title, err);
  }
}
