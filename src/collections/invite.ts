import { Collection } from "./collection.base";
import mongoose from 'mongoose';

const inviteSchema = new mongoose.Schema({
    firstName : {type:String, required: true, trim: true},
    lastName : {type:String, required: true, trim: true},
    description : {type:String, required: true, trim: true},
    inviter: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    date: {type:Date, default: new Date()}
});

export class Invite extends Collection{
    constructor(){
        const Invite = mongoose.model('invite', inviteSchema);
        super(Invite);
    }

    getAll(sortObject? : any){
        return this.Collection.find(sortObject)
            .populate('inviter', 'name -_id');
    }
}