/**
 * @enum {string}
 * @readonly
 */
export enum TransanctionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export const TransanctionTypes: string[] = Object.values(TransanctionType);

/**
 * @enum {string}
 * @readonly
 */
export enum TransanctionStatus {
  ABANDONED = 'abandoned',
  FAILED = 'failed',
  PENDING = 'pending',
  SUCCESS = 'successful',
}

export const TransanctionStatuses: string[] = Object.values(TransanctionStatus);

/**
 * @enum {string}
 * @readonly
 */
export enum TransanctionCurrency {
  NARIA = 'NGN',
  DOLLAR = 'USD',
}

export const TransanctionCurrencies: string[] = Object.values(TransanctionCurrency);
