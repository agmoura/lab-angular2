import {Component, Input, ContentChildren, QueryList, OnInit, ViewContainerRef, ComponentFactoryResolver, Directive, Type, Output, EventEmitter} from '@angular/core';
import {FieldComponent} from "../model/field";

@Component({
    selector: 'table-data',
    template: `
    <table>
        <thead>
            <tr>
                <th *ngFor="let field of fields">
                    {{field.label | translate}}
                </th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let record of data">
                <td *ngFor="let field of fields">
                    <template [table-field]="field" [record]="record"></template>
                </td>
                <button (click)="edit(record)">EDIT</button>
            </tr>
        </tbody>
    </table>
    `
})
export class TableDataComponent {
    @Input() data: Array<any>;
    @Output() onEdit = new EventEmitter<any>();
    @ContentChildren(FieldComponent) fields: QueryList<FieldComponent>;

    constructor() {
    }

    edit(record: any) {
        this.onEdit.emit(record);
    }
}

@Directive({
    selector: '[table-field]'
})
export class TableFieldDirective implements OnInit {
    @Input('table-field') field: FieldComponent;
    @Input() record: Array<any>;

    constructor(private container: ViewContainerRef, private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        let factory = this.resolver.resolveComponentFactory(<Type<FieldComponent>> this.field.constructor);
        let component = this.container.createComponent(factory);
        component.instance.source = this.field.source;
        component.instance.record = this.record;
    }
}