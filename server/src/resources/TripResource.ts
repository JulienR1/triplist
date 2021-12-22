import { ITripList } from "@common/models/ITripList";
import { getActivities } from "./ActivityResource";

const getTripList = async (): Promise<ITripList> => {
	const activities = await getActivities();
	return { ...mockTripList(activities.length), activities };
};

const mockTripList = (categoryCount: number) => {
	const generateRandomBoolArray = (len: number) => {
		return Array(len)
			.fill(true)
			.map((v) => Math.floor(Math.random() * 2) === 0);
	};

	const triplist: ITripList = {
		activities: Array(5)
			.fill("a")
			.map((a, index) => `${a}${index}`),
		categories: {},
	};

	for (let i = 0; i < 4; i++) {
		(triplist.categories as any)[`c${i}`] = Array(5)
			.fill(true)
			.map((v, index) => ({
				name: `item${index}`,
				values: generateRandomBoolArray(categoryCount),
			}));
	}

	return triplist;
};

export { getTripList };
