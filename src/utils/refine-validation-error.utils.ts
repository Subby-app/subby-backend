function formatErrorMessage(msg: string): string {
  // Regex to locate the appropriate space for inserting commas in numbers.
  const regex = /(?<!.*ISO \d)\B(?=(\d{3})+(?!\d))/g;

  // Remove quotation marks and insert a comma into the number if found.
  return `${msg.replace(/"/g, '').replace(regex, ',')}.`;
}

interface RefinedError {
  path: string;
  message: string;
}

/**
 *
 * @param {import('joi').ValidationError} error
 * @returns {RefinedError}
 */
export function refineError(error: import('joi').ValidationError): RefinedError {
  const refinedError: RefinedError = { path: '', message: '' };

  const reducer = (path: string, key: string | number): string => {
    if (path === '') return path + key;
    return `${path}.${key}`;
  };

  for (const detail of error.details) {
    refinedError.path = detail.path.reduce(reducer, '');
    refinedError.message = formatErrorMessage(detail.message);
  }

  return refinedError;
}
