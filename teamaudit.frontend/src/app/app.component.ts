import {Component, ViewEncapsulation, OnInit} from '@angular/core';

@Component({
    selector: 'ta-app',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
