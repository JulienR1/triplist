import { ITripList } from "../../../common/ITripList";

const getTripList = (): ITripList => {
	return mockTripList();
};

const mockTripList = () => {
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
		(triplist.categories as any)[`c${i}`] = Array(6)
			.fill(true)
			.map((v, index) => ({
				name: `item${index}`,
				values: generateRandomBoolArray(5),
			}));
	}

	return triplist;
};

export { getTripList };
