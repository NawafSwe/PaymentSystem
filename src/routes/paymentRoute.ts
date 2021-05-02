const express = require('express');
export const route = express.Router();
import {
    getPayments,
    createPayment,
    patchPayment,
    getPaymentById,
    deletePayment
} from "../controllers/paymentsController";

route.get('/', getPayments);
route.get(':/id', getPaymentById);
route.post('/', createPayment);
// patch to do soft delete
route.patch('/:id', patchPayment);
route.delete('/:id', deletePayment);




