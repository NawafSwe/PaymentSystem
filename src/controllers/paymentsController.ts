/**
 * @module src/controllers/paymentController.ts
 * @description module orchestrate the payment collection with the database and send responses back to client
 * @requires {Response,Request,NextFunction}
 * @requires IPayment
 * @requires User
 * @requires Payment
 * @requires scheduleEmail
 */


import {Response, Request, NextFunction} from "express";
import {IPayment} from "../models/payment/IPayment";
import {userModel as User} from '../models/user/userModel';
import {paymentModel as Payment} from '../models/payment/paymentModel';
import {scheduleEmail} from "../util/mailerSchedule";

/**
 * @async
 * @function
 * @namespace getPayments
 * @param req express request
 * @param res express response
 * @param next next func
 * @description getting all payments from database
 * @returns Promise<void> nothing returned it is only sending response back to the client
 */
export async function getPayments(req: Request, res: Response, next?: NextFunction) {
    try {
        // finding all payments with user
        const payments = await Payment.find({}).populate('_customerId').exec();
        res.json(payments).status(200);
    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'}).status(400);
    }
}

/**
 * @async
 * @function
 * @namespace createPayment
 * @param req express request
 * @param res express response
 * @param next next func
 * @description creating new payment to the database
 * @returns Promise<void> nothing returned it is only sending response back to the client
 */

export async function createPayment(req: Request, res: Response, next?: NextFunction) {
    try {
        const user = await User.findById(req.body._customerId);
        if (user) {
            let validPayment = await canHavePayment(user.payments);
            if (validPayment) {
                const response: IPayment | never = await Payment.create(req.body) as IPayment;
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


/**
 * @async
 * @function
 * @namespace getPaymentById
 * @param req express request
 * @param res express response
 * @param next next func
 * @description getting payment by id from database
 * @returns Promise<void> nothing returned it is only sending response back to the client
 */

export async function getPaymentById(req: Request, res: Response, next?: NextFunction) {
    try {
        res.json(await Payment.findById(req.params.id)).status(200);
    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'}).status(400);
    }
}

/**
 * @async
 * @function
 * @namespace patchPayment
 * @param req express request
 * @param res express response
 * @param next next func
 * @description edit payment information partially
 * @returns Promise<void> nothing returned it is only sending response back to the client
 */
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


/**
 * @async
 * @function
 * @namespace deletePayment
 * @param req express request
 * @param res express response
 * @param next next func
 * @description mark payment as deleted
 * @returns Promise<void> nothing returned it is only sending response back to the client
 */

export async function deletePayment(req: Request, res: Response, next?: NextFunction) {
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


/**
 * @async
 * @function
 * @namespace deletePayment
 * @param payments list of payments
 * @description checking whether user has active payment or not
 * @returns Promise<boolean> nothing returned it is only sending response back to the client
 */
async function canHavePayment(payments: IPayment[]): Promise<boolean> {
    // assuming user does not have active payment
    let activePayment = false;
    for (let payment of payments) {
        if (!payment.isDeleted) {
            return activePayment;
        }
    }
    // if we did not find any not deleted payment means there is no active payment for the user
    return !activePayment;
}
