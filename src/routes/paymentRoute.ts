/**
 * @module src/routes/paymentRoute.ts
 * @description express routing for payment collection
 * @requires {express,getPayments,createPayment,patchPayment,deletePayment,getPaymentById}
 */

const express = require('express');
export const route = express.Router();
import {
    getPayments,
    createPayment,
    patchPayment,
    getPaymentById,
    deletePayment
} from "../controllers/paymentsController";

// get all payments
route.get('/', getPayments);
// get payment by id
route.get(':/id', getPaymentById);
// post new payment
route.post('/', createPayment);

// patch to do soft delete
route.patch('/:id', patchPayment);
// delete payment
route.delete('/:id', deletePayment);




