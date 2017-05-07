import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { WelcomeComponent } from './welcome/welcome.component';
// import { CollectionComponent } from './collection/collection.component';
import { CollectionListComponent } from './collection/collection-list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
    // { path: 'welcome', component: WelcomeComponent },
    { path: 'file-upload', component: FileUploadComponent },
    { path: 'collections', component: CollectionListComponent },
    { path: '', component: WelcomeComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        FileUploadComponent,
        CollectionListComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
