import {FormGroup, FormControl} from "@angular/forms";
import {Component, OnInit, OnDestroy, OnChanges, Input, SimpleChanges, Injector} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from "@angular/common";

import {EntityBase} from '../../shared/model/models';
import {DataService} from '../../shared/services/data.service';
import {FieldType, FormViewSchema, ResourceSchema} from '../model/schema';
import {MdSnackBar} from "@angular/material";
import {ActionSchema, BaseAction} from "../model/action-schema";

@Component({
    selector: 'edit',
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

    @Input() resource: string;
    @Input() resourceId: string; // resourceId
    @Input() target: string;
    @Input() targetId: string;
    @Input() formViewSchema: FormViewSchema;

    FieldType: typeof FieldType = FieldType;
    routeSubscription: any;
    mainForm: FormGroup;
    entity: EntityBase = <EntityBase>{};
    childEdit: any;

    constructor(private route: ActivatedRoute,
                private location: Location,
                private dataService: DataService,
                public snackBar: MdSnackBar,
                private injector: Injector) {
    }

    ngOnInit() {

        //document.querySelector('body').classList.toggle('aside-menu-hidden');

        if (!this.resource) {
            this.routeSubscription = this.route.data.subscribe(data => {
                let schema: ResourceSchema = data['schema'];
                if (schema instanceof Function) schema = schema();

                this.formViewSchema = schema.formView;
                this.resource = schema.resource;
                this.resourceId = this.route.snapshot.params['id'];

                this.mainForm = this.createForm(this.formViewSchema);
                this.load(this.resourceId);
            });
        }
    }

    ngOnDestroy() {
        if (this.routeSubscription) this.routeSubscription.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.mainForm = this.createForm(this.formViewSchema);
        this.load(this.resourceId);
    }

    createForm(formViewSchema: FormViewSchema) {

        let group: any = {id: new FormControl()};

        formViewSchema.fields.forEach(field => {
            if (field.type !== FieldType.Reference)
                group[field.source] = new FormControl();
            else {
                group[field.source] = new FormGroup({[field.select.value]: new FormControl()});
            }
        });

        return new FormGroup(group);
    }

    load(id: string) {
        if (id)
            this.dataService.get<EntityBase>(this.resource, id).subscribe(data => {

                this.cleanEntity(data);
                this.mainForm.patchValue(data);
                this.entity = data;
            });
    }

    // Remove Undefined, Null and Empty Attributes
    cleanEntity(entity: EntityBase) {
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

    save(entity: EntityBase) {

        this.cleanEntity(entity);

        //TODO: Refatorar código
        if (this.target) {
            let targetPath: string[] = this.target.split('.');

            if (targetPath.length > 1) {
                if (!entity[targetPath[0]]) entity[targetPath[0]] = {[targetPath[1]]: this.targetId};
            }
            else {
                entity[targetPath[0]] = [{id: this.targetId}];
            }
        }

        this.dataService.save(this.resource, entity).subscribe(
            data => this.entity = data,
            error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK'),
            () => {
                this.resourceId = this.entity.id;
                this.snackBar.open('Operação realizada com sucesso', 'OK', {duration: 2000})
            }
        );
    }

    delete() {
        this.dataService.delete(this.resource, this.resourceId).subscribe(
            data => data,
            error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK'),
            () => {
                this.resourceId = this.entity.id;
                this.snackBar.open('Operação realizada com sucesso', 'OK', {duration: 2000});
                this.goBack();
            }
        );
    }

    goBack() {
        //this.router.navigate(['entity', this.resource]);
        this.location.back();
    }

    executeAction(actionSchema: ActionSchema<any>) {
        BaseAction.execute(actionSchema, {entity: this.mainForm.value}, this.injector);
    }

}
