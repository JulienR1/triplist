import { STR_MAX_LENGTH } from "./../constants";

export const integerIsValid = (num: number) => {
    return (Boolean(num) || num === 0) && Math.floor(num) === num;
};

export const positiveIntegerIsValid = (num: number) => {
    return integerIsValid(num) && num >= 0;
};

export const stringIsValid = (str: string) => {
    return Boolean(str) && str.trim().length > 0;
};

export const storedStringIsValid = (
    str: string,
    maxLength = STR_MAX_LENGTH,
): boolean => {
    return stringIsValid(str) && str.trim().length <= maxLength;
};
