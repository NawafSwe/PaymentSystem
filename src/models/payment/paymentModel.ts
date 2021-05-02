import {IPayment} from "./IPayment";
import * as mongoose from 'mongoose';
import {Schema, Model, model, Mongoose, Types} from "mongoose";


const schema: Schema = new mongoose.Schema({
    _customerId: {required: true, type: Schema.Types.ObjectId, ref: 'user'},
    amount: {required: true, type: Number},
    currency: {required: true, type: String},
    dueDate: {type: Date, default: Date() + 30 * 24 * 60 * 60 * 1000},
    paidDate: {type: Date, required: false},
    isDeleted: {type: Boolean, default: false},
    status: {type: String, default: 'NC'}

});

export const paymentModel: Model<IPayment> = model<IPayment>('payment', schema);
