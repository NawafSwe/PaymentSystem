// use next if there is no res.json();
import {Response, Request, NextFunction} from "express";
import {IUser} from "../models/user/IUser";
import {userModel as User} from '../models/user/userModel';


export async function getUsers(req: Request, res: Response, next?: NextFunction) {
    try {
        res.json(await User.find({}));
    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'})
            .status(400);
    }
}

export async function createUser(req: Request, res: Response, next?: NextFunction) {
    try {
        res.json(await User.create(req.body)).status(201);
    } catch (error: any) {
        res.json({message: `${error.message}`, code: 400, status: 'Bad Request'})
            .status(400);
    }
}

export async function getUserById(req: Request, res: Response, next?: NextFunction) {
    try {
        res.json(await User.findById(req.params.id));
    } catch (error: any) {
        res.json().status(400);
    }
}


