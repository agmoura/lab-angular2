import {Component, Input, SimpleChanges, OnChanges, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormViewSchema, ReferenceSchema, ReferenceType} from "../../shared/model/schema";

@Component({
    selector: 'reference-many',
    template: `
    <datagrid [entityName]="referenceSchema.source" 
              [listViewSchema]="referenceSchema.listView"
              [filter]="filter"
              (onCreate)="edit()"
              (onEdit)="edit($event)">
    </datagrid>

    `
})
export class ReferenceManyComponent implements OnChanges {
    @Input() referenceSchema: ReferenceSchema;
    @Input() parentId: string;
    @Output() onEdit = new EventEmitter<any>();

    toogleEdit: boolean = false;
    entityId: string;
    filter: any;

    constructor(private router: Router) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (this.referenceSchema.type === ReferenceType.ManyToMany)
            this.filter = {[this.referenceSchema.target]: {contains: this.parentId}};

        else if (this.referenceSchema.type === ReferenceType.OneToMany) {
            this.filter = {[this.referenceSchema.target]: {eq: this.parentId}};

            /*if (parentId && this.entitySchema.parentId) {
             var parentIdPath: string[] = this.entitySchema.parentId.path.split('.');
             entity[parentIdPath[0]] = {[parentIdPath[1]]: parentId};
             }*/

        }
    }

    edit(id: string = null) {

        this.onEdit.emit({
            referenceSchema: this.referenceSchema,
            entityId: id
        });

        /*this.entityId = id;
         this.toogleEdit = true;*/
        //this.router.navigate(['entity', this.referenceSchema.source, 'edit', id]);
    }

    onEndEdit() {
        this.toogleEdit = false;
    }
}