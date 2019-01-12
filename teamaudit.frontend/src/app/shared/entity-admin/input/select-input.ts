import {HttpClient} from "@angular/common/http";
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'select-input',
    template: `
        <wrapper-input [formGroup]="group" [schema]="schema">
            <select class="form-control" [id]="schema.index" [formControlName]="'id'" [required]="schema.required">
                <option value="">--- SELECT ---</option>
                <option *ngFor="let item of items" [ngValue]="item[schema.dataSource.valueField]">
                    {{item[schema.dataSource.textField]}}
                </option>
            </select>
        </wrapper-input>
    `,
})
export class SelectInputComponent extends FieldComponent<any> implements OnInit, OnChanges {
    @Input() public items = [];

    constructor(private http: HttpClient) {
        super();
    }

    ngOnInit(): void {
        this.schema.dataSource.execute(this.http)
            .subscribe(list => this.items = list);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.schema && changes.schema.currentValue) {
            this.schema.dataSource.execute(this.http)
                .subscribe(list => this.items = list);
        }
    }

    /*[compareWith]="compare.bind(this)"
    public compare(item1: any, item2: any): boolean {
        return this.schema.dataSource.compare(item1, item2);
    }*/
}