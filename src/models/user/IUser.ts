import {Document} from "mongoose";
import {IPayment} from "../payment/IPayment";

export interface IUser extends Document {
    name: string;
    email: string;
    payments: IPayment[];
    isDeleted: boolean;

}
