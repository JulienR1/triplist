import { IActivity } from "../models/IActivity";
import { positiveIntegerIsValid, storedStringIsValid } from "./baseValidators";

const activityIsValid = (activity: IActivity) => {
    return activity && positiveIntegerIsValid(activity.id) && storedStringIsValid(activity.label);
};

const activitiesAreEqual = (a: IActivity, b: IActivity): boolean => {
    return false;
};

export { activityIsValid, activitiesAreEqual };
