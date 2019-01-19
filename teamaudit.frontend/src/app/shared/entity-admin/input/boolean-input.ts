import {Component} from '@angular/core';
import {FieldComponent} from '../model/field';

@Component({
    selector: 'boolean-input',
    template: `
        <wrapper-input [formGroup]="group" [schema]="schema">
            <nz-switch
                [id]="schema.index"
                [formControlName]="schema.source"
                [required]="schema.required">
            </nz-switch>
        </wrapper-input>
    `,
})
export class BooleanInputComponent extends FieldComponent<boolean> {
    constructor() {
        super();
    }
}