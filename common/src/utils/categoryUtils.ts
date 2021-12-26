import { IItem } from "../models/IItem";
import { ICategory } from "../models/ICategory";
import { positiveIntegerIsValid, storedStringIsValid } from "./baseValidators";
import { arraysAreEqual } from "./utils";

const categoryIsValid = (category: ICategory): boolean => {
    return category && positiveIntegerIsValid(category.id) && storedStringIsValid(category.label) && category.items?.length >= 0;
};

const categoriesAreEqual = (a: ICategory, b: ICategory) => {
    return a && b && a.id === b.id && a.label === b.label && arraysAreEqual<IItem>(a.items, b.items);
};

export { categoryIsValid, categoriesAreEqual };
