import _ from 'lodash';
import { ObjectSchema, ValidationError } from 'joi';
import { refineError } from '../../utils/refine-validation-error.utils';
import { ValidationException } from '../../utils/exceptions/validation.exception';

interface DtoClass {
  from: Function;
}

export class ValidateRequest {
  #validator: ObjectSchema;
  #DtoClass?: DtoClass;

  constructor(validator: ObjectSchema, DtoClass?: DtoClass) {
    this.execute = this.execute.bind(this);

    this.#validator = validator;
    this.#DtoClass = DtoClass;
  }

  execute(req: any, res: any, next: any) {
    // Enforcing passing DTO class for POST, PATCH, and PUT requests.
    if (!_.isEmpty(req.body) && this.#DtoClass === undefined) {
      throw new Error('A DtoClass is required');
    }

    const { value, error }: { value: any; error?: ValidationError } = this.#validator.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
      },
      { stripUnknown: true, convert: true },
    );

    // Refining joi validation error
    if (error) {
      const err = refineError(error);
      throw new ValidationException(err);
    }

    /*
     * If the request body is not empty and has been validated successfully,
     * a data transfer object is created using the provided DtoClass and assigned to the request body.
     * Fields with value "undefined" are stripped from DTOClass object.
     */
    if (!_.isEmpty(req.body) && this.#DtoClass !== undefined) {
      req.body = _.omitBy(this.#DtoClass.from(value.body), _.isUndefined);
    }

    req.params = value.params || req.params;
    req.query = value.query || req.query;

    next();
  }

  /**
   *
   * @param {import('joi').ObjectSchema} validator
   * @param {{from: Function}} [DtoClass]
   * @returns {(req, res, next) => void}
   */
  static with(validator: ObjectSchema, DtoClass?: DtoClass) {
    if (!validator) throw new Error('Validator is required');

    return new ValidateRequest(validator, DtoClass).execute;
  }
}
