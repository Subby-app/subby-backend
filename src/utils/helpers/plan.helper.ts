/**
 * @enum {string}
 * @readonly
 */
export const PlanOnBoardingTypes = ['link', 'credential'] as const;

export type PlanOnBoardingType = (typeof PlanOnBoardingTypes)[number];
