import { STR_MAX_LENGTH } from "./../constants";

const integerIsValid = (num: number) => {
    return (Boolean(num) || num === 0) && Math.floor(num) === num;
};

const positiveIntegerIsValid = (num: number) => {
    return integerIsValid(num) && num >= 0;
};

const stringIsValid = (str: string) => {
    return Boolean(str) && str.trim().length > 0;
};

const storedStringIsValid = (str: string, maxLength = STR_MAX_LENGTH): boolean => {
    return stringIsValid(str) && str.trim().length <= maxLength;
};

export { integerIsValid, positiveIntegerIsValid, stringIsValid, storedStringIsValid };
