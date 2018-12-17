import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'number-input',
    template: `
        <div class="form-group" [formGroup]="group" [hidden]="schema.hidden">
            <label for="number-input-000" class="col-md-2 control-label">{{schema.label | translate}}</label>
            <div class="col-md-10">
                <input type="number" step="0.01" class="form-control" id="number-input-000" [formControlName]="schema.source" [placeholder]="schema.label | translate" [required]="schema.required" >
            </div>
        </div>
    `,
})
export class NumberInputComponent extends FieldComponent {
    constructor() {
        super();
    }
}