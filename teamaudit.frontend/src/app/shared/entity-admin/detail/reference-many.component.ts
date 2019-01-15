import {Component, Input, SimpleChanges, OnChanges, EventEmitter, Output} from '@angular/core';
import {ReferenceSchema, ReferenceType} from '../model/schema';
import {DataService} from '../../services/data.service';
import {DxDatagridComponent} from '../list/dxdatagrid.component';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'reference-many',
    template: `
        <ng-container *ngIf="referenceSchema.type === ReferenceType.ManyToMany">
            <dxdatagrid #datagrid
                        [resource]="referenceSchema.resource"
                        [listViewSchema]="referenceSchema.listView"
                        [filter]="filter"
                        (onCreate)="edit()"
                        (onEdit)="edit($event)"
                        (onLink)="selectedKeys = $event;">
            </dxdatagrid>
        </ng-container>

        <ng-container *ngIf="referenceSchema.type === ReferenceType.OneToMany">
            <dxdatagrid [resource]="referenceSchema.resource"
                        [listViewSchema]="referenceSchema.listView"
                        [filter]="filter"
                        (onCreate)="edit()"
                        (onEdit)="edit($event)">
            </dxdatagrid>
        </ng-container>
    `
})
export class ReferenceManyComponent implements OnChanges {
    @Input() referenceSchema: ReferenceSchema;
    @Input() resource: string;
    @Input() targetId: string;
    @Output() onEdit = new EventEmitter<any>();

    ReferenceType: typeof ReferenceType = ReferenceType;
    resourceId: string;
    filter: any;
    selectedKeys = [];

    constructor(private dataService: DataService) {

    }

    ngOnChanges(changes: SimpleChanges): void {

        if (this.referenceSchema.type === ReferenceType.ManyToMany)
            this.filter = {[this.referenceSchema.target]: {contains: this.targetId}};

        else if (this.referenceSchema.type === ReferenceType.OneToMany) {
            this.filter = {[this.referenceSchema.target]: {eq: this.targetId}};
        }
    }

    edit(id: string = null) {
        this.onEdit.emit({
            referenceSchema: this.referenceSchema,
            resourceId: id
        });
    }

    link(dataGrid: DxDatagridComponent) {
        let entity = {id: this.targetId};

        entity[this.referenceSchema.targetInverse] = this.selectedKeys.map(item => {
            return {id: item};
        });

        this.dataService.patch(this.resource, entity).subscribe(
            data => entity = data,
            error => NotificationService.error('Ocorreu um erro: ' + JSON.stringify(error.json().errors)),
            () => {
                dataGrid.load();
                NotificationService.success('Operação realizada com sucesso');
            }
        );
    }
}