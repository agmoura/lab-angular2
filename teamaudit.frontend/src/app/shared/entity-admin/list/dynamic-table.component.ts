import {Component, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {ListViewSchema, FieldType} from '../model/schema';
import {DataService} from '../../services/data.service';
import {Page} from '../../model/paged-list';
import {ResourceQuery} from '../../model/query';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'dynamicTable',
    template: `
        <nz-table #table 
                  [nzData]="list"
                  [nzLoading]="loading" 
                  [nzPageSize]="10">
            
            <thead>
            <tr>
                <th *ngIf="selectedKeys"></th>
                <th *ngFor="let column of columns" [hidden]="column.hidden">{{column.label}}</th>
                <th style="text-align:right">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let data of table.data">
                <td *ngIf="selectedKeys" nzShowCheckbox [(nzChecked)]="data.selected" [nzDisabled]="data.disabled"></td>
                <td *ngFor="let column of columns" [hidden]="column.hidden">
                    {{data[column.index]}}
                </td>
                <td align="right">
                    <a nz-popconfirm nzTitle="Are you sure delete this register?" (nzOnConfirm)="delete(data)">Delete</a>
                    <nz-divider nzType="vertical"></nz-divider>
                    <a (click)="edit(data)">Edit</a>
                 </td>
            </tr>
            </tbody>
        </nz-table>

        <!--<dx-data-grid
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
            
            &lt;!&ndash;<dxi-column type="buttons">
                <dxi-button name="delete"></dxi-button>
                <dxi-button hint="Edit" icon="edit" [onClick]="edit"></dxi-button>
            </dxi-column>&ndash;&gt;

            &lt;!&ndash;<dxi-column *ngFor="let field of entitySchema.listView.fields; let index = index" [dataField]="[index+1]" caption="{{field.label}}"></dxi-column>&ndash;&gt;

            &lt;!&ndash;<div *dxTemplate="let cellData of 'phoneCellTemplate'">
                <dx-button (onClick)="callNumber(cellData.value)" [text]="cellData.text"></dx-button>
            </div>&ndash;&gt;
        </dx-data-grid>-->
    `
})
export class DynamicTableComponent implements OnChanges {

    @Input() resource: string;
    @Input() listViewSchema: ListViewSchema;
    @Input() filter: any;
    @Input() selectedKeys;
    @Output() onCreate = new EventEmitter();
    @Output() onEdit = new EventEmitter<string>();
    // @Output() onLink = new EventEmitter<Array<any>>();
    // @Output() selectedKeysChange = new EventEmitter<Array<any>>();

    public columns: any[];
    public list = [];
    public loading = true;
    private resourceQuery: ResourceQuery;
    private page: Page;

    constructor(private notification: NotificationService,
                private dataService: DataService,
                private translateService: TranslateService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.listViewSchema)
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

        this.columns = this.listViewSchema.fields.map((field, index) => {
            let dataType;
            switch (field.type) {
                case FieldType.Date: dataType = 'date'; break;
                case FieldType.Boolean: dataType = 'boolean'; break;
                case FieldType.Number: dataType = 'number'; break;
                case FieldType.Text: dataType = 'string'; break;
            }

            return {
                index: index,
                label: this.translateService.instant(field.label),
                dataType: dataType,
                hidden: field.hidden
            };
        });

        this.load();
    }

    private getId(entity: any) {
        return entity[this.resourceQuery.projections.length - 1];
    }

    public load() {
        this.loading = true;
        this.dataService.find(this.resourceQuery).subscribe(
            data => {
                this.list = data.list;
                // this.resourceQuery.pageItem(this.page = new Page(data.page));
                this.loading = false;
            },
            error => {
                this.loading = false;
                throw error;
            }
        );
    }

    public delete(entity: any) {
        this.dataService.delete(this.resource, this.getId(entity)).subscribe(() => {
            this.load();
            this.notification.success('Exclusão realizada com sucesso');
        });
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



    public getKeys(): string[] {
        return this.list.map(item => this.getId(item));
    }

    public getSelectedKeys(): string[] {
        return this.list
            .filter(item => item.selected)
            .map(item => this.getId(item));
    }
}
