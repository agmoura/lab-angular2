import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'number-input',
    template: `
        <md-input-container [formGroup]="group" class="form-input">
            <input mdInput [formControlName]="schema.source" [placeholder]="schema.label | translate" [required]="schema.required" type="number" step="0.01">
        </md-input-container>
    `,
})
export class NumberInputComponent extends FieldComponent {
    constructor() {
        super();
    }
}