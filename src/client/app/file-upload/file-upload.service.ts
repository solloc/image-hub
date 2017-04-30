import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class FileUploadService {
    constructor(private http: Http) {}

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        // console.log('error caught');
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private extractData(res: Response) {
        console.log('extracting data');
        let body = res.json();
        return body.data || { };
    }


    uploadFile(filesToUpload: FileList): Observable<String> {
        console.log('post request sent');


        let headers = new Headers();
        // let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
        let options = new RequestOptions({ headers: headers });

        let formData = new FormData();

        for (let _i = 0; _i < filesToUpload.length; _i++) {
            formData.append('filesToUpload', filesToUpload.item(_i));
        }

        // formData.append('filesToUpload', filesToUpload[0]);


        return this.http.post('api/file', formData ,options)
            // .map(this.extractData)
            .catch(this.handleError);

        // let

        // let promise = this.http.get('api/file')
        //     .toPromise();


        // console.log('completed');

    }
}