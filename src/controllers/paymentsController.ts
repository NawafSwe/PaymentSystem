import {Response, Request, NextFunction} from "express";
import {IPayment} from "../models/payment/IPayment";
import {IUser} from "../models/user/IUser";
import {userModel as User} from '../models/user/userModel';
import {paymentModel as Payment} from '../models/payment/paymentModel';
import {scheduleEmail} from "../util/mailerSchedule";


export async function getPayments(req: Request, res: Response, next?: NextFunction) {
    try {
        // finding all payments with user
        const payments = await Payment.find({}).populate('_customerId').exec();
        res.json(payments).status(200);
    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'}).status(400);
    }
}

export async function createPayment(req: Request, res: Response, next?: NextFunction) {
    try {
        const response: IPayment | never = await Payment.create(req.body) as IPayment;
        const user = await User.findById(req.body._customerId);
        if (user) {
            user.payments.push(response);
            await user.save();
            await scheduleEmail(user.email, response.dueDate);
            res.json(response).status(200);
        }


    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'}).status(400);
    }
}

export async function getPaymentById() {
}

// used to patch payment to change it partially and make its status deleted
export async function patchPayment(req: Request, res: Response, next?: NextFunction) {
    try {
        const payment: IPayment | never | null = await Payment.findById(req.params.id).populate('_customerId').exec();
        if (payment) {
            payment.isDeleted = true;
            await payment.save();
            res.json(payment).status(203);
        }

    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'}).status(400);
    }
}
