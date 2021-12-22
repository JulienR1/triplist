const integerIsValid = (num: number) => {
	return Boolean(num) && Math.floor(num) === num;
};

const positiveIntegerIsValid = (num: number) => {
	return integerIsValid(num) && num >= 0;
};

const stringIsValid = (str: string) => {
	return Boolean(str) && str.trim().length > 0;
};

export { integerIsValid, positiveIntegerIsValid, stringIsValid };
