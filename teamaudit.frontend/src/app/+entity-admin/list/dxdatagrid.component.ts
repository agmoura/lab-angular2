import {
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    Input,
    EventEmitter,
    Output
} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {ListViewSchema, FieldType} from "../model/schema";
import {DataService} from "../../shared/services/data.service";
import {Page} from "../../shared/model/paged-list";
import {ResourceQuery} from "../../shared/model/query";
import {NotificationService} from "../shared/notification.service";

@Component({
    selector: 'dxdatagrid',
    template: `
        <dx-data-grid
            [dataSource]="entityList"
            [columns]="gridColumns"
            [filterRow]="{visible: false, applyFilter: 'auto'}"
            [searchPanel]="{visible: true, width: 240}"
            [headerFilter]="{visible: false}"

            [groupPanel]="{visible: false}"
            [allowColumnReordering]="true"
            [allowColumnResizing]="true"
            [columnHidingEnabled]="true"
            [columnAutoWidth]="true"
            [columnChooser]="{enabled: true}"
            [columnFixing]="{enabled: true}"

            [editing]="{mode: 'form', allowUpdating: false, allowDeleting: true, allowAdding: true, useIcons: true}"
            (onRowRemoved)="delete($event.data)"
            [selection]="{mode: 'multiple', showCheckBoxesMode: 'none'}"

            [export]="{enabled: true, fileName: resource, allowExportSelectedData: true}"
            [paging]="{pageSize: 10}"
            [pager]="{visible: true, showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true}"
            [showColumnLines]="false"
            [showBorders]="false"
            [hoverStateEnabled]="true">
            
            <!--<dxi-column type="buttons">
                <dxi-button name="delete"></dxi-button>
                <dxi-button hint="Edit" icon="edit" [onClick]="edit"></dxi-button>
            </dxi-column>-->

            <!--<dxi-column *ngFor="let field of entitySchema.listView.fields; let index = index" [dataField]="[index+1]" caption="{{field.label}}"></dxi-column>-->

            <!--<div *dxTemplate="let cellData of 'phoneCellTemplate'">
                <dx-button (onClick)="callNumber(cellData.value)" [text]="cellData.text"></dx-button>
            </div>-->
        </dx-data-grid>
    `
})
export class DxDatagridComponent implements OnInit, OnDestroy, OnChanges {

    @Input() resource: string;
    @Input() listViewSchema: ListViewSchema;
    @Input() filter: any;
    @Input() selectedKeys = [];
    @Output() onCreate = new EventEmitter();
    @Output() onEdit = new EventEmitter<string>();
    @Output() onLink = new EventEmitter<Array<any>>();
    @Output() selectedKeysChange = new EventEmitter<Array<any>>();

    resourceQuery: ResourceQuery;
    entityList = [];
    page: Page;
    gridColumns: any[];

    constructor(private dataService: DataService,
                private translateService: TranslateService) {

    }

    ngOnInit() {

    }

    ngOnDestroy() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['resource'])
            this.setup();
    }

    private setup() {
        this.page = new Page();
        this.page.size = 0; // dxDataGrid

        this.resourceQuery = new ResourceQuery(this.resource)
            .selectList(this.listViewSchema.fields.map(field => field.source))
            .select('id')
            .where(this.filter)
            // .pageItem(this.page)
            .orderByList(this.listViewSchema.orders);

        // dxDataGrid
        this.gridColumns = this.listViewSchema.fields.map((field, index) => {
            let dataType;

            switch (field.type) {
                case FieldType.Date: dataType = 'date'; break;
                case FieldType.Boolean: dataType = 'boolean'; break;
                case FieldType.Number: dataType = 'number'; break;
                case FieldType.Text: dataType = 'string'; break;
            }

            return {
                dataField: `${index}`,
                caption: this.translateService.instant(field.label),
                dataType: dataType,
                visible: !field.hidden
            };
        });

        this.gridColumns.push({
            type: 'buttons', caption: 'Actions', buttons: ['delete', {
                hint: 'Edit',
                icon: 'edit',
                onClick: e => {
                    this.edit(e.row.data);
                    e.event.preventDefault();
                }
            }]
        });

        this.load();
    }

    private getId(entity: any) {
        return entity[this.resourceQuery.projections.length - 1];
    }

    public load() {
        this.dataService.find(this.resourceQuery)
            .subscribe(
                data => {
                    this.entityList = data.list;
                    // this.resourceQuery.pageItem(this.page = new Page(data.page));
                },
                error => alert(error)
            );
    }

    public delete(entity: any) {
        this.dataService.delete(this.resource, this.getId(entity)).subscribe(
            data => this.load(),
            error => NotificationService.showError('Ocorreu um erro: ' + JSON.stringify(error.json().errors))
        );
    }

    private toogleFilter() {
        // this.dataGrid.option("headerFilter.visible", !this.dataGrid.option("headerFilter.visible"));
        // this.dataGrid.option("filterRow.visible", !this.dataGrid.option("filterRow.visible"));
    }

    private create() {
        this.onCreate.emit();
    }

    private edit(entity: any) {
        this.onEdit.emit(this.getId(entity));
    }

    private link() {
        let resourceKeys = this.entityList.map(item => item[this.resourceQuery.projections.length - 1]);
        this.onLink.emit(resourceKeys);
    }
}
