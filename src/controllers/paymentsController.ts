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
            let validPayment = await canHavePayment(user.payments);
            if (validPayment) {
                user.payments.push(response);
                await user.save();
                // sending payment to mark it deleted or include some info about it in the email
                await scheduleEmail({email: user.email, _id: user.id, payment: response}, response.dueDate);
                res.json(response).status(200);
            } else {
                res.json({
                    message: 'you cannot have more than one active payment',
                    code: 406,
                    status: 'Not Accepted'
                }).status(406);
            }
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

async function deletePayment(req: Request, res: Response, next?: NextFunction) {
    try {
        const payment: IPayment | null | never = await Payment.findById(req.params.id);
        if (payment) {
            payment.isDeleted = true;
            await payment.save();
            console.log(`payment altered successfully`);
            res.json(payment).status(200);

        }

    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'}).status(400);
    }
}

async function canHavePayment(payments: IPayment[]): Promise<Boolean> {
    // assuming user does not have active payment
    let activePayment = false;
    for (let payment of payments) {
        if (!payment.isDeleted) {
            return !activePayment;
        }
    }
    return activePayment;
}
