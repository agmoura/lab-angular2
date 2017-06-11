import {Component, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ValueAccessorBase} from "./value-accessor";
import {FieldComponent} from "../model/field";

@Component({
    selector: 'select-input',
    template: `
        <div class="form-group" [formGroup]="group">
            <label for="select-input-000" class="col-md-2 control-label">{{schema.label | translate}}</label>
            <div class="col-md-10">
                <select id="select-input-000" class="form-control selectpicker" data-dropup-auto="false" [formControlName]="schema.select.value" >
                    <option value="">--- SELECT ---</option>
                    <option *ngFor="let item of items" [value]="item[sourceValue]">
                        {{item[sourceText]}}
                    </option>
                </select>
            </div>
        </div>
    `,
})
export class SelectInputComponent extends FieldComponent  {
    @Input() public name: string;
    @Input() public label: string;

    @Input() public sourceValue: any = 0;
    @Input() public sourceText: any = 1;

    @Input() public items = [];
    @Input() public required: boolean;

    constructor() {
        super();
    }
}