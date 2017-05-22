import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'boolean-input',
    template: `
        <div class="form-group" [formGroup]="group">
            <label for="boolean-input-000" class="col-md-2 control-label">{{schema.label | translate}}</label>
            <div class="col-md-10">
                <input type="checkbox" class="form-control" id="boolean-input-000" [formControlName]="schema.source" [placeholder]="schema.label | translate">
            </div>
        </div>
    `,
})
export class BooleanInputComponent extends FieldComponent {
    constructor() {
        super();
    }
}