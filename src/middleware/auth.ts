import config from 'config';
import jwt from'jsonwebtoken';

export function authMiddleware(req: any, res: any, next: any){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('ACCESS_DENIED_NO_TOKEN');
    
    try{
        const decoded = jwt.verify(token, config.get("tokenKey"));
        req.user = decoded;
        next();
    }
    catch (ex){
        res.status(400).send('INAVLID_TOKEN');
    }
}