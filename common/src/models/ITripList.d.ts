import { IActivity } from "./IActivity";
import { ICategory } from "./ICategory";

export interface ITripList {
    activities: IActivity[];
    categories: ICategory[];
}
