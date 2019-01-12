import {Route} from '@angular/router';
import {Injectable} from "@angular/core";
import {FormGroup, Validators} from '@angular/forms';
import {Observable, EMPTY} from "rxjs";

import {BaseAction, RouteAction, FieldType, ListComponent, EditComponent, ResourceSchema, ReferenceDataSource} from '../../shared/entity-admin';
import {EntityBase} from "../../shared/model/models";
import {DataService} from "../../shared/services/data.service";
import {NotificationService} from '../../shared/services/notification.service';

export const objetivoRoutes: Route[] = [
    {path: 'objetivos', component: ListComponent, data: {schema: getObjetivoResource}},
    {path: 'objetivos/edit', component: EditComponent, data: {schema: getObjetivoResource}},
    {path: 'objetivos/edit/:id', component: EditComponent, data: {schema: getObjetivoResource}}
];

export function getObjetivoResource() {
    return objetivoResource;
}

@Injectable()
export class DuplicateObjetiveAction extends BaseAction<EntityBase> {
    public form: FormGroup;

    constructor(private dataService: DataService) {
        super();
    }

    public isEnabled(): boolean {
        return !!this.form.value.id;
    }

    public execute(): Observable<EntityBase> {
        const entity = this.form.value;
        entity.id = null;
        entity.nome +=  ' (Cópia)';
        this.dataService.save('objetivos', entity).subscribe(
            data => {},
            undefined,
            () => NotificationService.success('Cópia realizada com sucesso')
        );

        return EMPTY;
    }
}

export const objetivoResource = new ResourceSchema('objetivos', {
    listView: {
        fields: [
            {source: 'categoriaObjetivo.escopo.nome', hidden: true},
            {source: 'categoriaObjetivo.nome'},
            {source: 'nome'},
            {source: 'descricao'}
        ],
        orders: ['nome asc']
    },
    formView: {
        fields: [
            {source: 'nome', type: FieldType.Text, required: true},
            {source: 'descricao', type: FieldType.Text, required: true},
            {source: 'descricaoMeta', type: FieldType.Text},
            {source: 'valorMeta', type: FieldType.Number},
            {source: 'percentualMeta', type: FieldType.Number},
            {
                source: 'categoriaObjetivo', type: FieldType.Group, fields: [{
                    source: 'id',
                    type: FieldType.Reference,
                    dataSource: new ReferenceDataSource('categoriaObjetivos'),
                    validators: Validators.required
                }]
            },
            {
                source: 'unidadeOrganizacional', type: FieldType.Group, fields: [{
                    source: 'id',
                    type: FieldType.Reference,
                    dataSource: new ReferenceDataSource('organizationalUnits'),
                    validators: Validators.required
                }]
            },
        ],
        actions: [
            {label: 'Listar Categorias', icon: '', data: {route: '/riskmanagement/categoriaObjetivos'}, action: RouteAction},
            {label: 'Listar Escopos', icon: '', data: {route: '/riskmanagement/escopos'}, action: RouteAction},
            {label: 'Copiar Objetivo', icon: '', action: DuplicateObjetiveAction}
        ]
    }
});

export const objetivoProviders = [DuplicateObjetiveAction];
