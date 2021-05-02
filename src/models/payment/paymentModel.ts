/**
 * @module src/models/payment/IPayment
 * @description module to create mongodb collection
 * @requires IPayment
 * @requires {Mongoose,Schema,Model,model}
 */

import {IPayment} from "./IPayment";
import * as mongoose from 'mongoose';
import {Schema, Model, model, Mongoose} from "mongoose";


const schema: Schema = new mongoose.Schema({
    _customerId: {required: true, type: Schema.Types.ObjectId, ref: 'user'},
    amount: {required: true, type: Number},
    currency: {required: true, type: String},
    // assuming due date is now for testing
    dueDate: {type: Date, default: Date()},
    paidDate: {type: Date, required: false},
    isDeleted: {type: Boolean, default: false},
    status: {type: String, default: 'NC'}

});

export const paymentModel: Model<IPayment> = model<IPayment>('payment', schema);
