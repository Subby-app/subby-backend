import mongoose, { Error as MongooseError } from 'mongoose';
import { ConflictException, ValidationException } from '../../utils/exceptions/index';

interface ValidationError {
  message: string;
  path: string;
}

class BaseRepository {
  static DUPLICATE_ERROR_KEY = 'E11000';

  static isMongoDuplicateError(error: any): boolean {
    return error.message.includes(this.DUPLICATE_ERROR_KEY);
  }

  static formatMongoDuplicateError(
    error: Record<string, any>,
    suffix = '',
  ): { message: string; path: string } {
    const errorField = Object.keys(error.keyPattern)[0];

    return {
      message: errorField
        .charAt(0)
        .toUpperCase()
        .concat(errorField.slice(1))
        .replace(/([A-Z])/g, ' $1')
        .concat(' ', suffix)
        .trim(),
      path: errorField,
    };
  }

  static isValidationError(err: any): err is MongooseError.ValidationError {
    return err instanceof mongoose.Error.ValidationError;
  }

  static formatValidationError(err: MongooseError.ValidationError): ValidationError {
    const error: ValidationError = { message: '', path: '' };

    for (const key in err.errors) {
      const message = err.errors[key].message
        .replace('Path', '')
        .replace('`', '')
        .replace('`', '')
        .replace(key, key.charAt(0).toUpperCase().concat(key.slice(1)))
        .trim();

      error.message = message;
      error.path = key;
    }

    return error;
  }

  static handleRepositoryError(err: any): void {
    if (this.isMongoDuplicateError(err)) {
      const error = this.formatMongoDuplicateError(err);
      throw new ConflictException(error);
    }

    if (this.isValidationError(err)) {
      const error = this.formatValidationError(err);
      throw new ValidationException(error);
    }

    throw err;
  }
}

export default BaseRepository;
