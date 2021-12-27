import { IItem } from "../models/IItem";
import { positiveIntegerIsValid, storedStringIsValid } from "./baseValidators";
import { arraysAreEqual } from "./utils";

const itemIsValid = (item: IItem): boolean => {
    return item && positiveIntegerIsValid(item.id) && storedStringIsValid(item.label) && item.values?.length >= 0;
};

const itemsAreEqual = (a: IItem, b: IItem): boolean => {
    return a && b && a.id === b.id && a.label === b.label && arraysAreEqual(a.values, b.values);
};

export { itemIsValid, itemsAreEqual };
