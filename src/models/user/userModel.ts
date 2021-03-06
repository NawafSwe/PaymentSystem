/**
 * @module src/models/payment/userModel
 * @description module to create mongodb collection
 * @requires IUser
 * @requires {Mongoose,Schema,Model,model}
 */

import {Schema, Model, model} from "mongoose";
import {IUser} from "./IUser";

const schema: Schema = new Schema({
    name: {required: true, type: String},
    email: {required: true, type: String, unique: true},
    isDeleted: {type: Boolean, default: false},
    payments: [{type: Schema.Types.ObjectId, ref: 'payment'}],
});

export const userModel: Model<IUser> = model<IUser>('user', schema);
