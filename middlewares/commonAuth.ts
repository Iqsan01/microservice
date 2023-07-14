import { Request, NextFunction, Response } from 'express'
import {authPayload } from '../dto'
import { validateSignature } from "../utillity"

declare global {
    namespace Express{
        interface Request{
            user?: authPayload
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const signature = await validateSignature(req);
    if(signature){
        return next()
    }else{
        return res.json({message: "User Not authorised"});
    }
}