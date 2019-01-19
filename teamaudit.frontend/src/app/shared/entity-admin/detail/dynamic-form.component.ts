import {FormGroup} from '@angular/forms';
import {Component, OnChanges, Input, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {EntityBase} from '../../model/models';
import {DataService} from '../../services/data.service';
import {NotificationService} from '../../services/notification.service';
import {ActionService} from '../model/actions';
import {FormViewSchema, ReferenceSchema, ResourceSchema} from '../model/schema';
import {BaseAction} from '../index';

@Component({
    selector: 'dynamicForm',
    template: `
        <form nz-form [formGroup]="mainForm">
            <input type="hidden" formControlName="id">
            <ng-container *ngFor="let field of formViewSchema.fields">
                <ng-container [dynamicField]="field" [group]="mainForm"></ng-container>
            </ng-container>
        </form>
        <strong>form.value:</strong> {{mainForm.value | json}}
    `
})
export class DynamicFormComponent implements OnChanges {

    @Input() schema: ResourceSchema & ReferenceSchema;
    @Input() resourceId: string;
    @Input() targetId: string;
    @Output() resourceIdChange = new EventEmitter<string>();
    @Output() close = new EventEmitter<void>();

    public resource: string;
    public formViewSchema: FormViewSchema;
    public mainForm: FormGroup;
    public actions: BaseAction<EntityBase>[];

    constructor(private notification: NotificationService,
                private actionService: ActionService<EntityBase>,
                private dataService: DataService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.resource = this.schema.resource;
        this.formViewSchema = this.schema.formView;
        this.mainForm = this.formViewSchema.createForm();
        this.actions = this.actionService.getActions(this.formViewSchema.actions, {
            resource: this.resource,
            resourceId: this.resourceId,
            form: this.mainForm
        });

        this.load(this.resourceId);
    }

    private load(id: string) {
        // this.actions.execute(new getEntity(this.resource, id));

        if (id)
            this.dataService.get<any>(this.resource, id).subscribe(data =>
                this.mainForm.patchValue(data)
            );
    }

    // Remove Undefined, Null and Empty Attributes
    private cleanEntity(entity: EntityBase) {
        for (let attribute in entity) {
            if (entity[attribute] == undefined || entity[attribute] == null) {
                delete entity[attribute];
            }
            else if (typeof entity[attribute] === 'object') {
                this.cleanEntity(entity[attribute]);

                if (Object.keys(entity[attribute]).length === 0)
                    delete entity[attribute];
            }
        }
    }

    public save(): Observable<any> {
        const entity = this.mainForm.value;
        // this.actions.execute(new saveEntity(this.resource, entity));
        // this.cleanEntity(entity);

        //TODO: Refatorar código
        if (this.schema.target) {
            let targetPath: string[] = this.schema.target.split('.');

            if (targetPath.length > 1)
                entity[targetPath[0]] = {[targetPath[1]]: this.targetId};
            else
                entity[targetPath[0]] = [{id: this.targetId}];
        }

        return this.dataService.save<any>(this.resource, entity).pipe(tap(data => {
            this.mainForm.patchValue(data);
            this.resourceId = this.mainForm.get('id').value;
            this.resourceIdChange.emit(this.resourceId);
            this.notification.success('Operação realizada com sucesso');
        }));
    }

    public delete() {
        this.dataService.delete(this.resource, this.resourceId).subscribe(
            data => data,
            undefined,
            () => {
                this.notification.success('Exclusão realizada com sucesso');
                this.close.emit();
            }
        );
    }
}
