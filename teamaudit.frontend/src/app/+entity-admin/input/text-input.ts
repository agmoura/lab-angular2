import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'text-input',
    template: `
        <div class="form-group" [formGroup]="group">
            <label for="text-input-000" class="col-md-2 control-label">{{schema.label | translate}}</label>
            <div class="col-md-10">
                <input type="text" class="form-control" id="text-input-000" [formControlName]="schema.source" [placeholder]="schema.label | translate" [required]="schema.required" >
            </div>
        </div>
        <!--<p class="text-danger" *ngIf="firstName.errors?.required">You must include a first name.</p>-->
    `,
})
export class TextInputComponent extends FieldComponent {
    constructor() {
        super();
    }
}