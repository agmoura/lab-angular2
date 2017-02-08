import {Component, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ValueAccessorBase} from "./value-accessor";

@Component({
    selector: 'reference-input',
    template: `
    <md-select [placeholder]="label | translate" [(ngModel)]="value" [name]="name" [required]="required" class="form-input">
        <md-option *ngFor="let item of items" [value]="item[0]">
            {{item[1]}}
        </md-option>
    </md-select>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ReferenceInputComponent,
        multi: true,
    }]
})
export class ReferenceInputComponent extends ValueAccessorBase<string> {
    @Input() public name: string;
    @Input() public label: string;
    @Input() public required: boolean;
    @Input() public items = [];

    constructor() {
        super();
    }
}