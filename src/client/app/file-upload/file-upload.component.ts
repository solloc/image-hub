import { Component } from '@angular/core';
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

        let observer = {
            next: x => console.log('Observer got a next value: ' + x),
            error: err => console.error('Observer got an error: ' + err),
            complete: () => console.log('Observer got a complete notification')
        };

        this.fileUploadService.uploadFile(this.filesToUpload)
            .subscribe(observer);
    }

    setUploadStatus(status:String) {
        this.retvalue = status;
    }
}
