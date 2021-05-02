const express = require('express');
export const route = express.Router();
import {NextFunction, Request, Response} from "express";
import {getUsers, createUser, getUserById} from "../controllers/userController";

// adding route with controllers
// put validation before getUsers
route.get('/', [getUsers]);
route.post('/', createUser);
route.get('/:id', getUserById);
