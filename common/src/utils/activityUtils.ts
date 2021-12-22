import { STR_MAX_LENGTH } from "../constants";
import { IActivity } from "../models/IActivity";
import { positiveIntegerIsValid, stringIsValid } from "./baseValidators";

const activityIsValid = (activity: IActivity) => {
	return (
		activity &&
		positiveIntegerIsValid(activity.id) &&
		stringIsValid(activity.label) &&
		activity.label.length <= STR_MAX_LENGTH
	);
};

const activitiesAreEqual = (a: IActivity, b: IActivity): boolean => {
	return false;
};

export { activityIsValid, activitiesAreEqual };
