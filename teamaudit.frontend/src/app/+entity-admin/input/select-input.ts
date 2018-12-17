import {HttpClient} from "@angular/common/http";
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'select-input',
    template: `
        <div class="form-group" [formGroup]="group" [hidden]="schema.hidden">
            <label class="col-md-2 control-label">{{schema.label | translate}}</label>
            <div class="col-md-10">
                <select class="form-control" [formControlName]="'id'" [required]="schema.required">
                    <option value="">--- SELECT ---</option>
                    <option *ngFor="let item of items" [ngValue]="item[schema.dataSource.valueField]">
                        {{item[schema.dataSource.textField]}}
                    </option>
                </select>
            </div>
        </div>
    `,
})
export class SelectInputComponent extends FieldComponent implements OnInit, OnChanges {
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