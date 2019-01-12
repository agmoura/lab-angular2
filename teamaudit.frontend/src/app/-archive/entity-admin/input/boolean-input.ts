import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ValueAccessorBase} from "./value-accessor";

export const BOOLEAN_INPUT_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BooleanInputComponent),
    multi: true,
};

@Component({
    selector: 'boolean-input',
    template: `
        <div class="form-group row">
            <label *ngIf="label" [attr.for]="identifier">{{label}}</label>
            <input type="checkbox" [(ngModel)]="value" class="form-control" [id]="identifier">
        </div>
    `,
    providers: [BOOLEAN_INPUT_ACCESSOR],
})
export class BooleanInputComponent extends ValueAccessorBase<string> {
    @Input() public name: string;
    @Input() public label: string;

    constructor() {
        super();
    }
}