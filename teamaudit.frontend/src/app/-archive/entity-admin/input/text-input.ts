import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ValueAccessorBase} from './value-accessor';

export const TEXT_INPUT_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextInputComponent),
    multi: true,
};

@Component({
    selector: 'text-input',
    template: `
        <div class="form-group row">
            <label *ngIf="label" [attr.for]="identifier">{{label}}</label>
            <input type="text"
                   [(ngModel)]="value"
                   class="form-control"
                   [placeholder]="placeholder"
                   [required]="required"
                   [id]="identifier">
        </div>
    `,
    providers: [TEXT_INPUT_ACCESSOR],
})
export class TextInputComponent extends ValueAccessorBase<string> {
    @Input() public label: string;
    @Input() public required: boolean;
    @Input() public placeholder: string;

    constructor() {
        super();
    }
}