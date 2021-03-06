import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'ta-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    constructor( public translate: TranslateService) {
        translate.setDefaultLang('pt');
    }

    ngOnInit() {
    }

}
