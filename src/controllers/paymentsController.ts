import {Response, Request, NextFunction} from "express";
import {IPayment} from "../models/payment/IPayment";
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
        const response = await Payment.create<IPayment>(req.body);
        await scheduleEmail({}, '');
        res.json(response).status(200);


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
