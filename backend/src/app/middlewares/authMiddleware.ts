import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../../connections/requests';

interface ITokenPayLoad{
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(req: Request, res:Response, next: NextFunction): unknown {
    const {authorization} = req.headers;

    if(!authorization){
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try{
        const data = jwt.verify(token, SECRET);

        const {id} = data as ITokenPayLoad;

        req.userId = id;

        return next();
    }catch{
        return res.sendStatus(401);
    }
}
