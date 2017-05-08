import { Injectable } from '@angular/core';
import { ICollection } from './collection';
import { Http } from '@angular/http';
import { collections } from './collection-list.mock';
import {Observable} from "rxjs/Observable";

@Injectable()
export class CollectionService {

    // private _collections:ICollection[];

    constructor(private http:Http){
        // this._collections = collections;
    }

    // getCollections():ICollection[] {
    getCollections():Observable<ICollection[]> {
         return this.http.get('/api/collection')
             .map((res) => res.json());
         // return this._collections;


        // return this._collections;
    }

    // addCollection(collection:ICollection) {
    //     // collection._id = 'tmp-001';
    //     this._collections.push(collection);
    // }
}