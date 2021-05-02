/**
 * @module src/controllers/userController.ts
 * @description module orchestrate the user collection with the database and send responses back to client
 * @requires{Response,Request,NextFunction}
 * @requires IUser
 * @requires User
 *
 *
 */
import {Response, Request, NextFunction} from "express";
import {IUser} from "../models/user/IUser";
import {userModel as User} from '../models/user/userModel';


/**
 * @async
 * @function
 * @namespace getUsers
 * @param req express request
 * @param res express response
 * @param next next func
 * @description getting all users from database
 * @returns Promise<void> nothing returned it is only sending response back to the client
 */
export async function getUsers(req: Request, res: Response, next?: NextFunction) {
    try {
        res.json(await User.find({}));
    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'})
            .status(400);
    }
}

/**
 * @async
 * @function
 * @namespace createUser
 * @param req express request
 * @param res express response
 * @param next next func
 * @description creating new user to the database
 * @returns Promise<void> nothing returned it is only sending response back to the client
 */
export async function createUser(req: Request, res: Response, next?: NextFunction) {
    try {
        res.json(await User.create<IUser>(req.body)).status(201);
    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'})
            .status(400);
    }
}

/**
 * @async
 * @function
 * @namespace getUserById
 * @param req express request
 * @param res express response
 * @param next next func
 * @description getting user by id from database
 * @returns Promise<void> nothing returned it is only sending response back to the client
 */
export async function getUserById(req: Request, res: Response, next?: NextFunction) {
    try {
        res.json(await User.findById(req.params.id));
    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'}).status(400);
    }
}


