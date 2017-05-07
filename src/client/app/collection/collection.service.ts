import { Injectable } from '@angular/core';
import { ICollection } from './collection';
import { collections } from './collection-list.mock';

@Injectable()
export class CollectionService {

    private _collections:ICollection[];

    constructor(){
        this._collections = collections;
    }

    getCollections() {
        return this._collections;
    }

    addCollection(collection:ICollection) {
        collection.id = 'tmp-001';
        this._collections.push(collection);
    }
}