const express = require('express');
export const route = express.Router();
import {getPayments, createPayment, patchPayment} from "../controllers/paymentsController";

route.get('/', getPayments);
route.post('/', createPayment);
// patch to do soft delete
route.patch('/:id', patchPayment);



