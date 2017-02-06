import {Component, OnInit, OnChanges, SimpleChanges, OnDestroy, Input, EventEmitter, Output, ElementRef} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import * as $ from "jquery";
import DevExpress from 'devextreme/bundles/dx.all';
import 'devextreme/ui/data_grid.js';

import {EntitySchema, FieldType} from "../../shared/model/schema";
import {DataService} from "../../shared/services/data.service";
import {Page} from "../../shared/model/paged-list";
import {EntitySchemaService} from "../entity-schema.service";
import {EntityQuery} from "../../shared/model/query";

@Component({
    selector: 'datagrid',
    template: `
        <div></div>
    `
})
export class DatagridComponent implements OnInit, OnDestroy, OnChanges {

    @Input() entityName: string;

    @Output() onNew = new EventEmitter<string>();
    @Output() onEdit = new EventEmitter<string>();
    @Output() onSelect = new EventEmitter<Array<any>>();

    entitySchema: EntitySchema;
    entityQuery: EntityQuery;
    entityList = [];
    entityReferences: any = {};
    page: Page;
    errors: any;

    dataGrid: DevExpress.ui.dxDataGrid;
    gridColumns: any[];

    constructor(private dataService: DataService,
                private schemaService: EntitySchemaService,
                private element: ElementRef,
                private translateService: TranslateService) {

    }

    ngOnInit() {
        this.dataGrid = this.createGrid();
    }

    ngOnDestroy() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.setup();
    }

    private createGrid(): DevExpress.ui.dxDataGrid {
        let options: DevExpress.ui.dxDataGridOptions = {
            filterRow: {visible: true, applyFilter: "auto"},
            searchPanel: {visible: true, width: 240, placeholder: "Pesquisa..."},
            headerFilter: {visible: true},
            paging: {pageSize: 10},
            pager: {showPageSizeSelector: true, allowedPageSizes: [5, 10, 20], showInfo: true},

            /*groupPanel: {visible: true},*/
            allowColumnReordering: true,
            allowColumnResizing: true,
            columnHidingEnabled: true,
            columnAutoWidth: true,
            columnChooser: {enabled: true},
            columnFixing: {enabled: true},

            /*editing: {mode: 'form', allowUpdating: true, allowDeleting: true, allowAdding: true},*/
            selection: false,

            export: {enabled: true, fileName: 'export.list', allowExportSelectedData: true}
        };

        return $(this.element.nativeElement).dxDataGrid(options).dxDataGrid('instance');
    }

    private setup() {
        this.entitySchema = this.schemaService.getEntitySchema(this.entityName);
        this.page = new Page();
        this.page.size = 0; // dxDataGrid

        this.entityQuery = new EntityQuery(this.entityName)
            .selectList(this.entitySchema.listView.fields.map(field => field.path))
            .select('id')
            .pageItem(this.page)
            .orderByList(this.entitySchema.listView.orders);

        // dxDataGrid
        this.gridColumns = this.entitySchema.listView.fields.map((field, index) => {
                return {
                    dataField: `${index}`,
                    caption: this.translateService.instant(field.label),
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
                        self.gotoEdit(options.data);
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

                    // dxDataGrid
                    this.dataGrid.option({dataSource: this.entityList, columns: this.gridColumns});
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

    private gotoNew() {
        this.onNew.emit(null /*this.parentId*/);
    }

    private gotoEdit(entity: any) {
        this.onEdit.emit(this.getId(entity));
    }
}
