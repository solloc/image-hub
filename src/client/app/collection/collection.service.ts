import { Injectable } from '@angular/core';
import { ICollection } from './collection';
import {Headers, Http} from '@angular/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class CollectionService {

    constructor(private http:Http){ }

    getCollections():Observable<ICollection[]> {
         return this.http.get('/api/collection')
             .map((res) => res.json());
    }

    addCollection(collection) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/collection', collection, {
            headers: headers
        });
    }

    deleteCollection(id:string) {
        return this.http.delete('/api/collection/' + id);
    }
}