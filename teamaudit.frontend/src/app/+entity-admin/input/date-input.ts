import {Component, Input} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'date-input',
    template: `
        <div class="form-group" [formGroup]="group">
            <label for="date-input-000" class="col-md-2 control-label">{{schema.label | translate}}</label>
            <div class="col-md-10">
                <input type="date" class="form-control" id="date-input-000" [formControlName]="schema.source" [placeholder]="schema.label | translate" [required]="schema.required" >
            </div>
        </div>    `
})
export class DateInputComponent extends FieldComponent {
    @Input() public format: string;

    constructor() {
        super();
    }
}

let identifier = 0;