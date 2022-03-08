import mongoose from 'mongoose';

export class Collection{

    _collection: mongoose.Model<any>;

    constructor(collection: mongoose.Model<any>){
        this._collection = collection;
    }

    create(object:any){
        return this._collection.create(object)
    }

    update(id: number, object: any){
        return this._collection.updateOne({_id: id}, {
            $set:object
        });
    }

    delete(id: number){
        return this._collection.deleteOne({_id: id});
    }

    getAll(sortObject? : any){
        return this._collection.find(sortObject).sort({name: 1});
    }

    getById(id: number){
        return this._collection.findById(id);
    }

    get Collection() {
        return this._collection;
    }

}