/**
 * @enum {string}
 * @readonly
 */
export const PlanOnBoardingTypes = ['link', 'credential', 'email'] as const;

export type PlanOnBoardingType = (typeof PlanOnBoardingTypes)[number];
