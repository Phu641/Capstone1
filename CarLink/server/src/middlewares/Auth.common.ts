import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../dto";
import { ValidateSignature } from "../utility";
import { Role } from "../models";


declare global {

    namespace Express {
        interface Request {
            user?: Record<string,any>;
        }
    }

}

export const Authenticate = async(req: Request, res: Response, next: NextFunction) => {

    const validate = await ValidateSignature(req);

    if(validate) {

        next();

    } else return res.status(500).json('Người dùng này chưa được phân quyền!');

}

