import express from "express";
import { User } from "../collections/user";
import Joi from "joi";
import _ from 'lodash';
import bcrypt from 'bcrypt';
import {authMiddleware} from '../middleware/auth';

export const userRoutes = express.Router();
export const user = new User();

userRoutes.get('/', authMiddleware, (req, res) => {
    user.getAll(req.query).then((users) => {
        res.send(users);
    })
    //res.send({...req.params, ...req.query});
});

userRoutes.get('/me', authMiddleware, async (req : any, res) => {
    const me = await user.getById(req.user._id).select('-password');
    res.send(me);
})

userRoutes.get('/:id', (req, res) => {
    res.send({...req.params, ...req.query});
});

userRoutes.post('/create', (req, res) => {
    user.create(req.body).then((user : any) => {
        res.send(user);
    });
    // request will include recomendation id
    // recommneded user and new user will be added to the block chain
});

/*app.get('/', (req, res) => {

});*/

userRoutes.post('/register', async (req, res) => {

    console.log(req.body);
    
    /*const {error} = Validate(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
    }*/

    let userCollection = await user.Collection.findOne(_.pick(req.body,['email','phoneNumber']));

    if(userCollection){
        return res.status(400).send('USER_REGISTERED');
    }

    const userObj = req.body;
    userObj.password = await hashPassword(userObj.password);

    userCollection = await user.create(userObj);

    const token = userCollection.generateSchema();

    res.header('x-auth-token', token).send(userCollection);
    // request will include recomendation id
    // recommneded user and new user will be added to the block chain
});

async function hashPassword(password : string){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt);
}

function Validate(user:any){
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        addressLine1: Joi.string().min(3).max(100),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        phoneNumber: Joi.number()
    });

    return schema.validate(user);    
}

/*app.post('/recommend', (req, res) => {
    // a guid is generated and a record is added to the recommendations table
    recommendation{
        id: ,
        userId: ,
    }
});*/

