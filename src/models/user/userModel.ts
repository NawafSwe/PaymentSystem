import {Schema, Model, model} from "mongoose";
import {IUser} from "./IUser";

const schema: Schema = new Schema({
    name: {required: true, type: String},
    email: {required: true, type: String},
    isDeleted: {type: Boolean, default: false},
    payments: [{type: Schema.Types.ObjectId, ref: 'payment'}],
});

export const userModel: Model<IUser> = model<IUser>('user', schema);
