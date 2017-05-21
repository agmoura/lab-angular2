import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'text-input',
    template: `
        <md-input-container [formGroup]="group" class="form-input">
            <input mdInput [formControlName]="schema.source" [placeholder]="schema.label | translate" [required]="schema.required" type="text">
        </md-input-container>
        <!--<p class="text-danger" *ngIf="firstName.errors?.required">You must include a first name.</p>-->
    `,
})
export class TextInputComponent extends FieldComponent {
    constructor() {
        super();
    }
}