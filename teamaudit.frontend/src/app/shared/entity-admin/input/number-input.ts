import {Component} from '@angular/core';
import {FieldComponent} from '../model/field';

@Component({
    selector: 'number-input',
    template: `
        <wrapper-input [formGroup]="group" [schema]="schema">
            <nz-input-number
                [id]="schema.index"
                [formControlName]="schema.source"
                [required]="schema.required"
                [nzPlaceHolder]="schema.label | translate"
                [nzSize]="'100%'"
                [nzStep]="0.01">
            </nz-input-number>
        </wrapper-input>
    `,
})
export class NumberInputComponent extends FieldComponent<number> {
    constructor() {
        super();
    }
}