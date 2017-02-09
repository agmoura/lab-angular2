import {Component, Input, SimpleChanges, OnChanges, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ReferenceSchema, ReferenceType} from "../../shared/model/schema";
import {DataService} from "../../shared/services/data.service";
import {MdSnackBar} from "@angular/material";

@Component({
    selector: 'reference-many',
    template: `
    <ng-container *ngIf="referenceSchema.type === ReferenceType.ManyToMany">
        <datagrid [source]="referenceSchema.source" 
                  [listViewSchema]="referenceSchema.listView"
                  [filter]="filter"
                  (onCreate)="edit()"
                  (onEdit)="edit($event)"
                  (onLink)="selectedKeys = $event; dialog.open()">
        </datagrid>
        
        <md2-dialog #dialog>
            <md2-dialog-title>Asssociar {{referenceSchema.source.toUpperCase() | translate}}</md2-dialog-title>
            <datagrid *ngIf="dialog._isOpened" 
                      [source]="referenceSchema.source" 
                      [listViewSchema]="referenceSchema.listView"
                      [(selectedKeys)]="selectedKeys">
            </datagrid>
            <md2-dialog-footer>
                <button md-button (click)="dialog.close()">CANCELAR</button>
                <button md-button (click)="link(); dialog.close()">ASSOCIAR</button>
            </md2-dialog-footer>
        </md2-dialog>
    </ng-container>
    
    <ng-container *ngIf="referenceSchema.type === ReferenceType.OneToMany">
        <datagrid [source]="referenceSchema.source" 
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
    @Input() source: string; //TODO: Refatorar código confuso
    @Input() targetId: string;
    @Output() onEdit = new EventEmitter<any>();

    ReferenceType: typeof ReferenceType = ReferenceType;
    sourceId: string;
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
            sourceId: id
        });
    }

    link() {
        alert(this.selectedKeys);

        let entity = {id: this.targetId};

        entity[this.referenceSchema.targetInverse] = this.selectedKeys.map(item => {
            return {id: item};
        });

        this.dataService.patch(this.source, entity).subscribe(
            data => entity = data,
            error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK'),
            () => this.snackBar.open('Operação realizada com sucesso', 'OK', {duration: 2000})
        );
    }


}