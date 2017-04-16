import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './fileUpload/fileUpload.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, FileUploadComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }