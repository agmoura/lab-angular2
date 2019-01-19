import {Component, Input} from '@angular/core';
import {FieldComponent} from '../model/field';

@Component({
    selector: 'date-input',
    template: `
        <wrapper-input [formGroup]="group" [schema]="schema">
            <nz-date-picker
                [id]="schema.index"
                [formControlName]="schema.source"
                [nzPlaceHolder]="schema.label | translate"
                [required]="schema.required" 
                [nzFormat]="schema.format">
            </nz-date-picker>
        </wrapper-input>
    `
})
export class DateInputComponent extends FieldComponent<Date> {
    constructor() {
        super();
    }
}
