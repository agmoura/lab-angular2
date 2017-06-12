import {Component, Input} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'date-input',
    template: `
        <div [formGroup]="group" class="form-input">
            <md2-datepicker [formControlName]="schema.source" placeholder="{{schema.label | translate}}" format="{{format}}" type="date" class="form-input"></md2-datepicker>
        </div>
    `
})
export class DateInputComponent extends FieldComponent {
    @Input() public format: string;

    constructor() {
        super();
    }
}

let identifier = 0;