import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ValueAccessorBase} from './value-accessor';

export const SELECT_INPUT_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectInputComponent),
    multi: true,
};

@Component({
    selector: 'select-input',
    template: `
        <div class="form-group row">
            <label *ngIf="label" [attr.for]="identifier">{{label}}</label>
            <select [(ngModel)]="value" class="form-control" [required]="required">
                <option value=""> --- Selecione ---</option>
                <option *ngFor="let item of items" [value]="item[0]">
                    {{item[1]}}
                </option>
            </select>
        </div>
    `,
    providers: [SELECT_INPUT_ACCESSOR]
})
export class SelectInputComponent extends ValueAccessorBase<string> {
    @Input() label: string;
    @Input() required: boolean;
    @Input() items = [];

    constructor() {
        super();
    }
}