import {IPayment} from "./IPayment";
import * as mongoose from 'mongoose';
import {Schema, Model, model} from "mongoose";

const schema: Schema = new mongoose.Schema({
    _customerId: {required: true, type: mongoose.Types.ObjectId, ref: 'User'},
    amount: {required: true, type: Number},
    currency: {required: true, type: String},
    dueDate: {type: Date, default: Date() + 30 * 24 * 60 * 60 * 1000},
    paidDate: {type: Date, required: true}

});

export const paymentModel: Model<IPayment> = model<IPayment>('payment', schema);
