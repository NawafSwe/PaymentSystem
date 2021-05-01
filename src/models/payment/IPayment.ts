import {Document} from "mongoose";

export interface IPayment extends Document {
    _customerId: string;
    amount: number;
    currency: string;
    status: string;
    dueDate: Date;
    paidDate: Date;

}
