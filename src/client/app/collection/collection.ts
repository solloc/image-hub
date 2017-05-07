export interface ICollection {
    id:string;
    name:string;
}

export class Collection implements ICollection {
    id: string;
    name: string;

    constructor(id:string, name:string){
        this.id = id;
        this.name = name;
    }
}