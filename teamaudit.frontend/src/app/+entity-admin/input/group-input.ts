import {Component} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'group-input',
    template: `
        <ng-container [formGroup]="group">
            <ng-container *ngFor="let field of schema.fields" [formGroupName]="schema.source">
                <ng-container [dynamicField]="field" [group]="group.get(schema.source)"></ng-container>
            </ng-container>
        </ng-container>
    `,
})
export class GroupInputComponent extends FieldComponent<any> {
    constructor() {
        super();
    }
}