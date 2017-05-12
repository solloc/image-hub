import { Component, OnInit } from '@angular/core';
import { CollectionService } from './collection.service';
import {Collection, ICollection} from './collection';

@Component({
    templateUrl: './app/collection/collection-list.component.html',
    providers: [CollectionService]
})
export class CollectionListComponent implements OnInit {

    public collections: ICollection[];
    public newCollection = new Collection('','');

    constructor(private collectionService:CollectionService){}

    getCollections() {
        // this.collections = this.collectionService.getCollections().subscribe({
        this.collectionService.getCollections().subscribe({
            next: value => this.collections = value,
            error: err => console.error(err),
            complete: () => console.log('done fetching collections')
        });
    }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        console.log('Collection-List-Component initialized');
        this.getCollections();
    }

    addCollection() {
        let newCol = {
            'name': this.newCollection.name
        };
        this.collectionService.addCollection(newCol).subscribe({
            complete: () => {
                this.newCollection = new Collection('','');
                this.getCollections();
            }
        });
    }

    deleteCollection(id:string) {
        this.collectionService.deleteCollection(id).subscribe({
            complete: () => {
                console.log('collection ' + id + ' deleted');
                this.getCollections();
            }
        });
    }
}