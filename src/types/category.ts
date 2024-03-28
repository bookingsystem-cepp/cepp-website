import { USER } from "./user";

export type CATEGORY = {
    _id: string;
    name: string;
    location: string;
    owner: USER;
    description?: string;
};
  