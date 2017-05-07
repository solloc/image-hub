import { Component, OnInit } from '@angular/core';
import { CollectionService } from './collection.service';
import { Collection } from './collection';

@Component({
    templateUrl: './app/collection/collection-list.component.html',
    providers: [CollectionService]
})
export class CollectionListComponent implements OnInit {

    public collections;
    public newCollection = new Collection('','');

    constructor(private collectionService:CollectionService){}

    getCollections() {
        this.collections = this.collectionService.getCollections();
    }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        console.log('Collection-List-Component initialized');
        this.getCollections();
    }

    addCollection() {
        this.collectionService.addCollection(this.newCollection);
        this.collections = this.collectionService.getCollections();
        this.newCollection = new Collection('','');
    }
}