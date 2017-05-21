import {Component, Input} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'text-input',
    template: `
        <md2-datepicker [formGroup]="group" [formControlName]="schema.source" placeholder="{{schema.label | translate}}" format="{{format}}" type="date" class="form-input"></md2-datepicker>
    `
})
export class DateInputComponent extends FieldComponent {
    @Input() public format: string;

    constructor() {
        super();
    }
}

let identifier = 0;