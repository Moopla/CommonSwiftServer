import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import Joi from 'joi';
import { User } from '../collections/user';
import config from 'config';

export const authRoutes = express.Router();
const user = new User();

authRoutes.post('/', async (req, res) => {
    try{
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let userObj = await user.Collection.findOne({email: req.body.email});
        if(!userObj) return res.status(400).send("INVALID_EMAIL_PASSWORD");

        const validPassword = await bcrypt.compare(req.body.password, userObj.password);
        if(!validPassword) return res.status(400).send("INVALID_EMAIL_PASSWORD");

        const token = jwt.sign({ _id: userObj._id}, config.get("tokenKey"));
        res.send(userObj);

    }catch (ex){
        res.status(500).send(ex)
    }
});

function validate(req : any){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);    
}