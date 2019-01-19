import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'text-input',
    template: `
        <wrapper-input [formGroup]="group" [schema]="schema">
            <input nz-input type="text" [id]="schema.index" [formControlName]="schema.source" [placeholder]="schema.label | translate" [required]="schema.required" >
        </wrapper-input>
    `,
})
export class TextInputComponent extends FieldComponent<string> {
    constructor() {
        super();
    }
}