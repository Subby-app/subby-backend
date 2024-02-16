/**
 * @enum {string}
 * @readonly
 */
export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export const TransactionTypes: string[] = Object.values(TransactionType);

/**
 * @enum {string}
 * @readonly
 */
export enum TransactionStatus {
  ABANDONED = 'abandoned',
  FAILED = 'failed',
  PENDING = 'pending',
  SUCCESS = 'successful',
}

export const TransactionStatuses: string[] = Object.values(TransactionStatus);

/**
 * @enum {string}
 * @readonly
 */
export enum TransactionCurrency {
  NAIRA = 'NGN',
  DOLLAR = 'USD',
}

export const TransactionCurrencies: string[] = Object.values(TransactionCurrency);
