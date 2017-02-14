import {Component, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ValueAccessorBase} from "./value-accessor";

@Component({
    selector: 'select-input',
    template: `
    <md-select [placeholder]="label | translate" [(ngModel)]="value" [name]="name" [required]="required" class="form-input">
        <md-option *ngFor="let item of items" [value]="item[sourceValue]">
            {{item[sourceText]}}
        </md-option>
    </md-select>
    <p> Selected value: {{value}} </p>
    `,
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: SelectInputComponent, multi: true,}]
})
export class SelectInputComponent extends ValueAccessorBase<string> {
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