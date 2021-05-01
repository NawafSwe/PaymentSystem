import {Document} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;

}
