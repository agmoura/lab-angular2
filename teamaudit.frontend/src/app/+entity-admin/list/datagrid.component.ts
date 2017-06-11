import {Component, OnInit, OnChanges, SimpleChanges, OnDestroy, Input, EventEmitter, Output, ElementRef, ViewChild} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import * as $ from "jquery";
import DevExpress from 'devextreme/bundles/dx.all';
import 'devextreme/ui/data_grid.js';
import 'devextreme/ui/button.js';

import {ResourceSchema, ListViewSchema, FieldType} from "../model/schema";
import {DataService} from "../../shared/services/data.service";
import {Page} from "../../shared/model/paged-list";
import {ResourceQuery} from "../../shared/model/query";
import {NotificationService} from "../shared/notification.service";

@Component({
    selector: 'datagrid',
    template: '<div #container></div>'
})
export class DatagridComponent implements OnInit, OnDestroy, OnChanges {

    @ViewChild('container') container: ElementRef;
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

    dataGrid: DevExpress.ui.dxDataGrid;
    gridColumns: any[];

    constructor(private dataService: DataService,
                private translateService: TranslateService) {

    }

    ngOnInit() {
        this.dataGrid = this.createGrid();

    }

    ngOnDestroy() {
        $(this.container.nativeElement).remove();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['resource'])
            this.setup();
    }

    private createGrid(): DevExpress.ui.dxDataGrid {
        let self = this;
        let contentReady = false;

        let options: DevExpress.ui.dxDataGridOptions = {
            filterRow: {visible: false, applyFilter: "auto"},
            headerFilter: {visible: false},
            searchPanel: {visible: true, placeholder: "Pesquisa..."},
            paging: {pageSize: 10},
            pager: {showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true},

            /*groupPanel: {visible: true},*/
            allowColumnReordering: true,
            allowColumnResizing: true,
            columnHidingEnabled: false,
            columnAutoWidth: false,
            columnChooser: {enabled: true},
            /*columnFixing: {enabled: true},*/
            /*editing: {mode: 'form', allowUpdating: true, allowDeleting: true, allowAdding: true},*/

            export: {enabled: true, fileName: 'export.list', allowExportSelectedData: true},
            onContentReady: function (e) {
                if (!contentReady) {
                    let toolbar = e.element.find('.dx-toolbar-after');

                    toolbar.prepend($('<div>').dxButton({ icon: 'filter', onClick: function () { self.toogleFilter(); }}));

                    if(self.onCreate.observers.length > 0)
                        toolbar.prepend($('<div>').dxButton({ icon: 'add', onClick: function () { self.create() }}));

                    if(self.onLink.observers.length > 0)
                        toolbar.prepend($('<div>').dxButton({ icon: 'tags', onClick: function () { self.link();}}));

                    contentReady = true;
                }
            }

        };

        if(this.selectedKeysChange.observers.length > 0) {
            options.selection = {mode: 'multiple'};
            options.onSelectionChanged = function (e) {
                self.selectedKeysChange.emit(e.selectedRowKeys);
            }
        }

        return $(this.container.nativeElement).dxDataGrid(options).dxDataGrid('instance');
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
            }
        );

        let self = this;

        if(self.onEdit.observers.length > 0) {
            this.gridColumns.push({
                width: 100,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $('<a/>').addClass('dx-link')
                        .text('Editar')
                        .on('dxclick', function (e) {
                            self.edit(options.data);
                        })
                        .appendTo(container);
                }
            });
        }

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
                    this.resourceQuery.pageItem(this.page = new Page(data.page));
                    this.dataGrid.option({
                        dataSource: {
                            store: {
                                data: this.entityList,
                                type: 'array',
                                key: `${this.resourceQuery.projections.length - 1}`
                            }
                        },
                        columns: this.gridColumns,
                        selectedRowKeys: this.selectedKeys
                    });  // dxDataGrid
                },
                error => alert(error)
            );
    }

    private delete(entity: any) {
        if (confirm('Tem certeza que deseja exluir esse registro ?')) {
            this.dataService.delete(this.resource, this.getId(entity)).subscribe(
                data => this.load(),
                error => NotificationService.showError('Ocorreu um erro: ' + JSON.stringify(error.json().errors))
            );
        }
    }

    private toogleFilter() {
        this.dataGrid.option("headerFilter.visible", !this.dataGrid.option("headerFilter.visible"));
        this.dataGrid.option("filterRow.visible", !this.dataGrid.option("filterRow.visible"));
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
