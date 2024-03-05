/* eslint-disable indent */
import { TTenure } from '@/web/validators/family.validation';

export function calcEndDate(startDate: Date, tenure: TTenure) {
  const endDate = new Date(startDate);
  switch (tenure) {
    case 'daily':
      endDate.setDate(endDate.getDate() + 1);
      break;
    case 'weekly':
      endDate.setDate(endDate.getDate() + 7);
      break;
    case 'monthly':
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case 'quarterly':
      endDate.setMonth(endDate.getMonth() + 3);
      break;
    case 'biannually':
      endDate.setMonth(endDate.getMonth() + 6);
      break;
    case 'annually':
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    default:
      throw new Error(`Invalid tenure: ${tenure}`);
  }
  return endDate;
}
