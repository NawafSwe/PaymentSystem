/**
 * @module src/controllers/paymentController.ts
 * @description module orchestrate the payment collection with the database and send responses back to client
 * @requires {Response,Request,NextFunction}
 * @requires IPayment
 * @requires User
 * @requires Payment
 * @requires scheduleEmail
 * @requires APIError
 * @requires HttpCode
 */


import {Response, Request, NextFunction} from "express";
import {IPayment} from "../models/payment/IPayment";
import {userModel as User} from '../models/user/userModel';
import {paymentModel as Payment} from '../models/payment/paymentModel';
import {scheduleEmail} from "../util/mailerSchedule";
import {APIError, HttpCode} from '../util/errors/APIError';

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
export async function getPayments(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
        // finding all payments with user
        const payments = await Payment.find({}).populate('_customerId').exec();
        res.json(payments).status(200);
    } catch (error: any) {
        res.json(new APIError(
            `Bad request`,
            HttpCode.BadRequest,
            'server cannot serve requests in meanwhile if problem persist contact support team',
            `${error.message}`,
            false))
            .status(400);
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
            await canHavePayment(user.payments);
            const response: IPayment | never = await Payment.create(req.body) as IPayment;
            user.payments.push(response);
            await user.save();
            // sending payment to mark it deleted or include some info about it in the email
            await scheduleEmail({email: user.email, _id: user.id, payment: response}, response.dueDate);
            res.json(response).status(200);
        } else {
            // if user is not found
            const customMessage = `user with id ${req.body._customerId} not found`;
            throw new APIError('Not found', HttpCode.NotFound, customMessage, customMessage, false);
        }

    } catch (error: any) {
        // receiving error that have been through from the code above or any
        res.json(new APIError(
            error.name,
            error.httpCode,
            error.message,
            error.description, error.isOperational))
            .status(error.status);
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
async function canHavePayment(payments: IPayment[]): Promise<void> | never {
    // assuming user does not have active payment
    for (let payment of payments) {
        if (!payment.isDeleted) {
            // if user have active payment
            throw  new APIError('Not Accepted',
                HttpCode.NotAccepted,
                'user can have only one active payment in a month',
                'user have active payment where only one payment accepted',
                false);
        }
    }


}