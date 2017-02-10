import {Component, Input, ContentChildren, QueryList, ElementRef, AfterContentInit, OnInit, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {TextFieldComponent} from "./text-field";

@Component({
    selector: 'table-data',
    template: `
    <table class="table table-condensed table-hover">
        <thead>
            <tr>
                <th *ngFor="let field of fieldComponents" [hidden]="field.hidden">
                    {{field.source | translate}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let record of data">
                <td *ngFor="let field of fieldComponents">
                    <table-cell [componentType]="field.constructor.name" ></table-cell>
                </td>
            </tr>
        </tbody>
    </table>
    `
})
export class TableDataComponent implements AfterContentInit {
    @Input() data: Array<any>;
    @Input() label: string;
    @ContentChildren(TextFieldComponent) fieldComponents: QueryList<TextFieldComponent>;

    private fields = [
        {label: 'Nome', source: 'nome'},
        {label: 'Descricao', source: 'descricao'},
        {label: 'Interno', source: 'indicadorInternoSistema'}
    ];

    constructor() {
    }

    ngAfterContentInit(): void {
        let i = this.fieldComponents.length
    }
}


@Component({
    selector: 'grid-component',
    template: `
        <div class="row" *ngFor="let cellComponentType of cellComponentTypes">
            <div class="col-lg-12">
                <grid-cell [componentType]="cellComponentType"></grid-cell>
            </div>
        </div>
    `
})
export class Grid {
    @Input() componentTypes: any;
    cellComponentTypes: any[] = [];

    addDynamicCellComponent(selectedComponentType: any) {
        this.cellComponentTypes.push(selectedComponentType);
    }
}


@Component({
    selector: 'table-cell',
    template: ''
})
export class TableCellComponent implements OnInit {
    @Input() componentType: any;

    constructor(private container: ViewContainerRef, private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        let factory = this.resolver.resolveComponentFactory(this.componentType);
        this.container.createComponent(factory);
    }
}