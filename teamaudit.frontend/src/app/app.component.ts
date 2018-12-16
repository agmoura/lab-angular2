import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'ta-root',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor( public translate: TranslateService) {
        translate.setDefaultLang('pt');
    }

    ngOnInit() {
    }

}
