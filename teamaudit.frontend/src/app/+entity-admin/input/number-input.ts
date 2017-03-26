import {Component, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ValueAccessorBase} from "./value-accessor";

@Component({
    selector: 'number-input',
    template: `
    <md-input-container class="form-input">
        <input mdInput [placeholder]="label | translate" type="number" step="0.01" [(ngModel)]="value" [name]="name">
    </md-input-container>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: NumberInputComponent,
        multi: true,
    }],
})
export class NumberInputComponent extends ValueAccessorBase<string> {
    @Input() public name: string;
    @Input() public label: string;

    public identifier = `number-input-${identifier++}`;

    constructor() {
        super();
    }
}

let identifier = 0;