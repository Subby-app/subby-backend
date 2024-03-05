import mongoose, { Error as MongooseError } from 'mongoose';
import { ConflictException, ValidationException } from '../../utils/exceptions/index';
import { TFindPlanQuery } from '@/web/validators/plan.validation';
import { TFindApplicationQuery } from '@/web/validators/application.validation';
import { TFindFamiliesQuery } from '@/web/validators/family.validation';

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
    suffix = 'already exist',
  ): { message: string; path: string } {
    const errorField = Object.keys(error.keyPattern)[0];

    const formattedMessage = errorField
      .charAt(0)
      .toUpperCase()
      .concat(errorField.slice(1))
      .replace(/([A-Z])/g, ' $1')
      .trim();

    return {
      message: suffix ? `${formattedMessage} ${suffix}` : formattedMessage,
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

      error.path = key;
      error.message = message;
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

  static mapFilterObject(filters: TFindApplicationQuery | TFindFamiliesQuery | TFindPlanQuery) {
    const dbFilter: any = {};
    // Handle TFindApplicationQuery
    if ('appName' in filters) {
      const { appName } = filters as TFindApplicationQuery;

      if (appName) {
        dbFilter.appName = new RegExp(appName);
      }
    }

    // Handle TFindPlanQuery
    if ('applicationId' in filters || 'name' in filters || 'onBoardingType' in filters) {
      const { applicationId, name, onBoardingType } = filters as TFindPlanQuery;

      if (applicationId) {
        dbFilter.applicationId = new mongoose.Types.ObjectId(applicationId);
      }

      if (name) {
        dbFilter.name = new RegExp(name);
      }

      if (onBoardingType) {
        dbFilter.onBoardingType = new RegExp(onBoardingType);
      }
    }

    return dbFilter;
  }
}

export default BaseRepository;
