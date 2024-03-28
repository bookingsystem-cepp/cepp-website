import { ITEM } from "./item";

export type HISTORY = {
    _id: string;
    status: string;
    startDate: Date;
    endDate: string;
    borrower: string;
    owner: string;
    item: ITEM;
    count: number;
};