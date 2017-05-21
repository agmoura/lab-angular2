import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'text-input',
    template: `
        <md-slide-toggle [formGroup]="group" [formControlName]="schema.source">{{schema.label | translate}}</md-slide-toggle>
    `,
})
export class BooleanInputComponent extends FieldComponent {
    constructor() {
        super();
    }
}