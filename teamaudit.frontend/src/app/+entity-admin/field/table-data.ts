import {Component, Input, ContentChildren, QueryList, AfterContentInit, OnInit, ViewContainerRef, ComponentFactoryResolver, Directive, Type} from '@angular/core';
import {FieldComponent} from "./field";
import {ResourceService} from "../shared/resource.service";

@Component({
    selector: 'table-data',
    template: `
    <table class="table table-condensed table-hover">
        <thead>
            <tr>
                <th *ngFor="let field of fields">
                    {{field.label | translate}}
                </th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let record of resourceService.resourceData">
                <td *ngFor="let field of fields">
                    <template [table-field]="field" [record]="record"></template>
                </td>
                <button (click)="edit(record)">EDIT</button>
            </tr>
        </tbody>
    </table>
    `
})
export class TableDataComponent implements AfterContentInit {
    @ContentChildren(FieldComponent) fields: QueryList<FieldComponent>;

    constructor(private resourceService: ResourceService) {

    }

    ngAfterContentInit(): void {

    }

    edit(record: any) {
        this.resourceService.edit.next(record.id);
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