import {Response, Request, NextFunction} from "express";
import {IPayment} from "../models/payment/IPayment";
import {paymentModel as Payment} from '../models/payment/paymentModel';


export async function getPayments(req: Request, res: Response, next?: NextFunction) {
    try {
        res.json(await Payment.find({}));
    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'}).status(400);
    }
}

export async function createPayment(req: Request, res: Response, next?: NextFunction) {
    try {
        res.json(await Payment.create<IPayment>(req.body));

    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'}).status(400);
    }
}

export async function getPaymentById() {
}

// used to patch payment to change it partially and make its status deleted
export async function patchPayment(req: Request, res: Response, next?: NextFunction) {
    try {
        const payment: IPayment | never | null = await Payment.findById(req.params.id);
        if (payment) {
            payment.isDeleted = true;
            await payment.save();
            res.json(payment).status(203);
        } else {
            res.json({message: `payment with ${req.params.id} is not exists`, code: 404, status: 'Not Found'});
        }

    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'}).status(400);
    }
}
