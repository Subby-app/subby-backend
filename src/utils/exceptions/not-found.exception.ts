import { ApiException } from './api.exception';

/**
 *
 * @param {number} statusCode
 * @param {string} message
 */
export class NotFoundException extends ApiException {
  constructor(error: string | { message: string; path: string }) {
    const err = typeof error === 'string' ? { message: error } : error;
    super(404, 'Not Found', err.message);
  }
}
