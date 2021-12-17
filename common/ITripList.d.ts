export type Activity = string;

export interface ITripList {
	activities: Activity;
	categories: Category;
}

export interface Category {
	[key: string]: Item[];
}

export interface Item {
	name: string;
	values: boolean[];
}
