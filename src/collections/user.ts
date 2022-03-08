import { Collection } from "./collection.base";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    addressLine1: String,
    addressLine2: String,
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
});

userSchema.methods.generateSchema = function () {
    return jwt.sign({ _id: this._id }, 'c_swft_key');
};

export class User extends Collection {
    constructor() {
        const User = mongoose.model('user', userSchema);
        super(User);
    }
}