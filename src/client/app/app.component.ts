import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<h1>Hello {{name}}</h1>
                <a class="btn btn-primary" href="#" role="button">Link</a>
    <p>...</p>
    <file-upload></file-upload>
    <p>... after some cleanup ...</p>`
})
export class AppComponent {
    name = 'Angular';
}