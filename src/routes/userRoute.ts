const express = require('express');
export const route = express.Router();
import {NextFunction, Request, Response} from "express";
import {getUsers} from "../controllers/userController";

// adding route with controllers
route.get('/', getUsers);
