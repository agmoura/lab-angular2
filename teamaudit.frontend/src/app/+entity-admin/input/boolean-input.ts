import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'boolean-input',
    template: `
        <wrapper-input [formGroup]="group" [schema]="schema">
            <input type="checkbox" class="form-control" [id]="schema.index" [formControlName]="schema.source" [placeholder]="schema.label | translate">
        </wrapper-input>
    `,
})
export class BooleanInputComponent extends FieldComponent<boolean> {
    constructor() {
        super();
    }
}