/**
 * @enum {string}
 * @readonly
 */
export const ApplicationOnBoardingTypes = ['link', 'credential', 'email'] as const;

export type ApplicationOnBoardingType = (typeof ApplicationOnBoardingTypes)[number];
