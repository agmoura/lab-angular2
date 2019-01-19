import {Component, Input, SimpleChanges, OnChanges, ViewChild} from '@angular/core';
import {ReferenceSchema, ReferenceType} from '../model/schema';
import {DataService} from '../../services/data.service';
import {DynamicTableComponent} from '../list/dynamic-table.component';
import {NotificationService} from '../../services/notification.service';
import {DynamicFormComponent} from './dynamic-form.component';

@Component({
    selector: 'reference-many',
    template: `
        <nz-card
            [nzTitle]="schema.resource.toUpperCase() | translate"
            [nzBordered]="false"
            [nzExtra]="actions">

            <dynamicTable
                #table
                [resource]="schema.resource"
                [listViewSchema]="schema.listView"
                [filter]="filter"
                (onEdit)="openEdit($event)">
            </dynamicTable>
        </nz-card>

        <ng-template #actions>
            <button nz-button (click)="openEdit()"><i nz-icon type="plus"></i> Add New</button>
            <button *ngIf="isManyToMany" nz-button (click)="openLink()"><i nz-icon type="link"></i> Link</button>
        </ng-template>

        <!-- EDIT DIALOG -->
        <nz-drawer
            [nzTitle]="(resourceId ? 'Atualizar ' : 'Incluir ') + (schema.resource.toUpperCase() | translate)"
            [nzWidth]="750"
            [(nzVisible)]="editVisible"
            (nzOnClose)="editVisible = false">

            <dynamicForm
                #form
                [schema]="schema"
                [resourceId]="resourceId"
                [targetId]="targetId"
                (close)="editVisible = false">
            </dynamicForm>

            <div class="footer">
                <button nz-button nzType="default" (click)="editVisible = false"><i nz-icon type="close"></i> Cancel</button>
                <button nz-button nzType="primary" (click)="saveEdit()" [nzLoading]="saveLoading"><i nz-icon type="save"></i> Save</button>
            </div>
        </nz-drawer>

        <!-- LINK DIALOG -->
        <nz-modal
            *ngIf="isManyToMany"
            [nzTitle]="'Asssociar ' + (schema.resource.toUpperCase() | translate)"
            [(nzVisible)]="linkVisible"
            (nzOnCancel)="linkVisible = false"
            (nzOnOk)="saveLink(selection.getSelectedKeys())"
            [nzOkLoading]="linkLoading"
            nzWidth="75%">

            <dynamicTable
                #selection
                [resource]="schema.resource"
                [listViewSchema]="schema.listView"
                [selectedKeys]="selectedKeys">
            </dynamicTable>
        </nz-modal>
    `,
    styles: [`
        .footer {
            position: absolute;
            bottom: 0px;
            width: 100%;
            border-top: 1px solid rgb(232, 232, 232);
            padding: 10px 16px;
            text-align: right;
            left: 0px;
            background: #fff;
        }
    `]
})
export class ReferenceManyComponent implements OnChanges {
    @ViewChild('table') table: DynamicTableComponent;
    @ViewChild('form') form: DynamicFormComponent;

    @Input() schema: ReferenceSchema;
    @Input() resource: string; // Target Resource
    @Input() targetId: string;

    public isManyToMany;
    public filter: any;

    public resourceId: string;
    public editVisible = false;
    public saveLoading = false;

    public linkVisible = false;
    public linkLoading = false;
    public selectedKeys = [];

    constructor(private dataService: DataService, private notification: NotificationService) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isManyToMany = this.schema.type === ReferenceType.ManyToMany;

        if (this.isManyToMany)
            this.filter = {[this.schema.target]: {contains: this.targetId}};
        else
            this.filter = {[this.schema.target]: {eq: this.targetId}};
    }

    public openEdit(key: string = null) {
        this.resourceId = key;
        this.editVisible = true;
    }

    public saveEdit() {
        this.saveLoading = true;
        this.form.save().subscribe(
            data => {
                this.saveLoading = false;
                this.table.load();
            },
            error => {
                this.saveLoading = false;
                throw error;
            }
        );
    }

    public openLink() {
        this.selectedKeys = this.table.getKeys();
        this.linkVisible = true;
    }

    public saveLink(selectedKeys: string[]) {
        let entity = {id: this.targetId};

        entity[this.schema.targetInverse] = selectedKeys
            .map(item => ({id: item}));

        this.linkLoading = true;
        this.dataService.patch(this.resource, entity).subscribe(
            data => {
                this.linkVisible = this.linkLoading = false;
                this.table.load();
                this.notification.success('Operação realizada com sucesso');
            },
            error => {
                this.linkLoading = false;
                throw error;
            },
        );
    }
}
