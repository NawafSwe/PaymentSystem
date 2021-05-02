/**
 * @module src/models/payment/IUser
 * @description module to structure the data for payment
 * @requires {Document,IPayment}
 */

import {Document} from "mongoose";
import {IPayment} from "../payment/IPayment";

export interface IUser extends Document {
    name: string;
    email: string;
    payments: IPayment[];
    isDeleted: boolean;

}
