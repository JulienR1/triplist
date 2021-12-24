import { IItem } from "./IItem";

export interface ICategory {
    id: number;
    label: string;
    items: IItem[];
}
