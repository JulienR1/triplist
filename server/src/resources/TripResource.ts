import { ITripList } from "@common/models/ITripList";
import { getActivities } from "./ActivityResource";
import { getCategories } from "./CategoryResource";

const getTripList = async (): Promise<ITripList> => {
    const activities = await getActivities();
    const categories = await getCategories();
    return { activities, categories };
};

export { getTripList };
