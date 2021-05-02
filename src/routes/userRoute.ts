/**
 * @module src/routes/userRoute.ts
 * @description express routing for payment collection
 * @requires {express,getUsers,createUser,getUserById}
 */

const express = require('express');
export const route = express.Router();
import {getUsers, createUser, getUserById} from "../controllers/userController";

// adding route with controllers
// put validation before getUsers

// getting all users
route.get('/', [getUsers]);
// posting new user
route.post('/', createUser);
// getting user by id
route.get('/:id', getUserById);


