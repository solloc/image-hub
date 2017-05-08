export interface ICollection {
    _id:string;
    name:string;
}

export class Collection implements ICollection {
    _id: string;
    name: string;

    constructor(_id:string, name:string){
        this._id = _id;
        this.name = name;
    }
}