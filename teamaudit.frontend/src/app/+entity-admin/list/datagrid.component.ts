import {Component, OnInit, OnChanges, SimpleChanges, OnDestroy, Input, EventEmitter, Output, ElementRef, Directive} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import * as $ from "jquery";
import DevExpress from 'devextreme/bundles/dx.all';
import 'devextreme/ui/data_grid.js';
import 'devextreme/ui/button.js';

import {EntitySchema, ListViewSchema, FieldType} from "../../shared/model/schema";
import {DataService} from "../../shared/services/data.service";
import {Page} from "../../shared/model/paged-list";
import {EntityQuery} from "../../shared/model/query";

@Directive({
    selector: 'datagrid'
})
export class DatagridComponent implements OnInit, OnDestroy, OnChanges {

    @Input() entityName: string;
    @Input() listViewSchema: ListViewSchema;
    @Input() filter: any;

    @Output() onCreate = new EventEmitter<string>();
    @Output() onEdit = new EventEmitter<string>();
    @Output() onSelect = new EventEmitter<Array<any>>();

    entityQuery: EntityQuery;
    entityList = [];
    page: Page;
    errors: any;

    dataGrid: DevExpress.ui.dxDataGrid;
    gridColumns: any[];

    constructor(private dataService: DataService,
                private element: ElementRef,
                private translateService: TranslateService) {

    }

    ngOnInit() {
        this.dataGrid = this.createGrid();
    }

    ngOnDestroy() {
        $(this.element.nativeElement).remove();
    }

    ngOnChanges(changes: SimpleChanges): void {
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
            selection: false,

            export: {enabled: true, fileName: 'export.list', allowExportSelectedData: true},
            onContentReady: function (e) {
                if (!contentReady) {
                    let createButton = $('<div>').dxButton({
                        icon: 'add', onClick: function () {
                            self.create();
                        }
                    });

                    let toggleFilterButton = $('<div>').dxButton({
                        icon: 'filter', onClick: function () {
                            self.create();
                        }
                    });

                    e.element.find('.dx-toolbar-after').prepend(toggleFilterButton).prepend(createButton);

                    contentReady = true;
                }
            }

        };

        return $(this.element.nativeElement).dxDataGrid(options).dxDataGrid('instance');
    }

    private setup() {
        this.page = new Page();
        this.page.size = 0; // dxDataGrid

        this.entityQuery = new EntityQuery(this.entityName)
            .selectList(this.listViewSchema.fields.map(field => field.source))
            .select('id')
            .where(this.filter)
            .pageItem(this.page)
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

        this.load();
    }

    private getId(entity: any) {
        return entity[this.entityQuery.projections.length - 1];
    }

    private load() {

        this.dataService.find(this.entityQuery)
            .subscribe(
                data => {
                    this.entityList = data.list;
                    this.entityQuery.pageItem(this.page = new Page(data.page));
                    this.dataGrid.option({dataSource: this.entityList, columns: this.gridColumns});  // dxDataGrid
                },
                error => this.errors = error
            );
    }

    private delete(entity: any) {
        if (confirm('Tem certeza que deseja exluir esse registro ?')) {
            this.dataService.delete(this.entityName, this.getId(entity)).subscribe(
                data => this.load(),
                error => this.errors = error
            );
        }
    }

    private create() {
        this.onCreate.emit(null /*this.parentId*/);
    }

    private edit(entity: any) {
        this.onEdit.emit(this.getId(entity));
    }
}
