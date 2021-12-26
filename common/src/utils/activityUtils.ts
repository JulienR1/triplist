import { IActivity } from "../models/IActivity";
import { positiveIntegerIsValid, storedStringIsValid } from "./baseValidators";

const activityIsValid = (activity: IActivity) => {
    return activity && positiveIntegerIsValid(activity.id) && storedStringIsValid(activity.label);
};

const activitiesAreEqual = (a: IActivity, b: IActivity): boolean => {
    return a && b && a.id === b.id && a.label === b.label;
};

export { activityIsValid, activitiesAreEqual };
