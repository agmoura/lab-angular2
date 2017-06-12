import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'boolean-input',
    template: `
        <div [formGroup]="group" class="form-input">
            <md-slide-toggle [formControlName]="schema.source">{{schema.label | translate}}</md-slide-toggle>
        </div>
    `,
})
export class BooleanInputComponent extends FieldComponent {
    constructor() {
        super();
    }
}