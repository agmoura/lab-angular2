import {Component, Input, SimpleChanges, OnChanges, EventEmitter, Output} from '@angular/core';
import {ReferenceSchema, ReferenceType} from "../model/schema";
import {DataService} from "../../shared/services/data.service";
import {MdSnackBar} from "@angular/material";
import {DatagridComponent} from "../list/datagrid.component";

@Component({
    selector: 'reference-many',
    template: `
    <ng-container *ngIf="referenceSchema.type === ReferenceType.ManyToMany">
        <datagrid #datagrid
                  [resource]="referenceSchema.resource" 
                  [listViewSchema]="referenceSchema.listView"
                  [filter]="filter"
                  (onCreate)="edit()"
                  (onEdit)="edit($event)"
                  (onLink)="selectedKeys = $event; dialog.open()">
        </datagrid>
        
        <md2-dialog #dialog>
            <md2-dialog-title>Asssociar {{referenceSchema.resource.toUpperCase() | translate}}</md2-dialog-title>
            <datagrid *ngIf="dialog._isOpened" 
                      [resource]="referenceSchema.resource" 
                      [listViewSchema]="referenceSchema.listView"
                      [(selectedKeys)]="selectedKeys">
            </datagrid>
            <md2-dialog-footer>
                <button md-button (click)="dialog.close()">CANCELAR</button>
                <button md-button (click)="link(datagrid); dialog.close()">ASSOCIAR</button>
            </md2-dialog-footer>
        </md2-dialog>
    </ng-container>
    
    <ng-container *ngIf="referenceSchema.type === ReferenceType.OneToMany">
        <datagrid [resource]="referenceSchema.resource" 
                  [listViewSchema]="referenceSchema.listView"
                  [filter]="filter"
                  (onCreate)="edit()"
                  (onEdit)="edit($event)">
        </datagrid>
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

    constructor(private dataService: DataService, public snackBar: MdSnackBar) {

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

    link(dataGrid: DatagridComponent) {
        let entity = {id: this.targetId};

        entity[this.referenceSchema.targetInverse] = this.selectedKeys.map(item => {
            return {id: item};
        });

        this.dataService.patch(this.resource, entity).subscribe(
            data => entity = data,
            error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK'),
            () => {
                dataGrid.load();
                this.snackBar.open('Operação realizada com sucesso', 'OK', {duration: 2000});
            }
        );
    }
}