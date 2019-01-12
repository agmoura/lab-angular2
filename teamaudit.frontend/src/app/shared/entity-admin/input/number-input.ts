import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'number-input',
    template: `
        <wrapper-input [formGroup]="group" [schema]="schema">
            <input type="number" step="0.01" class="form-control" [id]="schema.index" [formControlName]="schema.source" [placeholder]="schema.label | translate" [required]="schema.required">
        </wrapper-input>
    `,
})
export class NumberInputComponent extends FieldComponent<number> {
    constructor() {
        super();
    }
}