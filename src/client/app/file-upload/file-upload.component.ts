import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploadService } from './file-upload.service';

@Component({
    templateUrl: './app/file-upload/file-upload.component.html',
    providers: [FileUploadService]
})
export class FileUploadComponent {

    retvalue: String;

    constructor(private fileUploadService: FileUploadService){}

    // constructor(private http: Http) {}

    filesToUpload: FileList;

    onFileChange($event){
        console.log('file selection changed');
        this.filesToUpload = $event.srcElement.files;
    }

    onSubmit(){
        console.log('form submitted');
        // this.http.post('/api/file', 'blaaa');
        this.fileUploadService.uploadFile(this.filesToUpload)
            .subscribe();
    }
}
