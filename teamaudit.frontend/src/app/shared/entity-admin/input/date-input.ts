import {Component, Input} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'date-input',
    template: `
        <wrapper-input [formGroup]="group" [schema]="schema">
            <input type="date" class="form-control" [id]="schema.index" [formControlName]="schema.source" [placeholder]="schema.label | translate" [required]="schema.required">
        </wrapper-input>
    `
})
export class DateInputComponent extends FieldComponent<Date> {
    @Input() public format: string;

    constructor() {
        super();
    }
}
