import { ApiException } from './api.exception';

/**
 *
 * @param {number} statusCode
 * @param {string} message
 * @param {message} string}
 */
export class ValidationException extends ApiException {
  constructor(
    error: { path: string; message: string },
    title: string = 'One or more validation errors occurred.',
  ) {
    super(400, title, error);
  }
}
