import { ITripList } from "@common/models/ITripList";
import { getActivities } from "./ActivityResource";
import { getCategories } from "./CategoryResource";

const getTripList = async (filters: string[]): Promise<ITripList> => {
    const activities = await getActivities(filters);
    const categories = await getCategories(filters);
    return { activities, categories };
};

export { getTripList };
