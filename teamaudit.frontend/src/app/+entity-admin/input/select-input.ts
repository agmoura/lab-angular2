import {Component, Input, OnInit} from '@angular/core';
import {FieldComponent} from "../model/field";
import {ResourceQuery} from "../../shared/model/query";
import {DataService} from "../../shared/services/data.service";
import {isUndefined} from "util";

@Component({
    selector: 'select-input',
    template: `
        <ng-container [formGroup]="group">
            <!--<md-select class="form-input" [formControlName]="schema.source" [placeholder]="schema.label | translate">
                <md-option value=""></md-option>
                <md-option *ngFor="let item of items" [value]="item[0]">
                    {{item[1]}}
                </md-option>
            </md-select>-->

            <ng-container [formGroupName]="schema.source">
                <label>{{schema.label | translate}}</label>
                <select [formControlName]="schema.select.value" class="form-input">
                    <option *ngFor="let item of items" [value]="item[0]">{{item[1]}}</option>
                </select>
                <button (click)="group.controls[schema.source].reset()">X</button>
            </ng-container>
        </ng-container>
    `
})
export class SelectInputComponent extends FieldComponent implements OnInit {
    private defaultValue = undefined;
    public items = [];

    constructor(private dataService: DataService) {
        super();
    }

    ngOnInit(): void {
        this.load();
    }

    private load(): void {
        const resourceQuery = new ResourceQuery(this.schema.referencePath || this.schema.source)
            .select(this.schema.select.value)
            .select(this.schema.select.text)
            .orderBy(this.schema.select.text);

        this.dataService.find(resourceQuery).subscribe(
            data => this.items = data.list
        );
    }
}