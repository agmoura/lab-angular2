import {Component, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {EntityFieldSchema} from "../../shared/model/schema";
import {ValueAccessorBase} from "./value-accessor";

@Component({
    selector: 'reference-input',
    template: `
    <div>
        <label *ngIf="label" [attr.for]="identifier">{{label}}</label>
        <select [(ngModel)]="value" class="form-control" [required]="field.required" >
            <option value=""> --- Selecione ---</option>
            <option *ngFor="let item of items" [value]="item[0]">
                {{item[1]}}
            </option>
        </select>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ReferenceInputComponent,
        multi: true,
    }]
})
export class ReferenceInputComponent extends ValueAccessorBase<string> {

    @Input() label: string;
    @Input() field: EntityFieldSchema;
    @Input() items = [];

    constructor() {
        super();
    }
}