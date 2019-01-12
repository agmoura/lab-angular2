import {Injectable} from '@angular/core';
import {Route} from '@angular/router';
import {FormGroup, Validators} from '@angular/forms';
import {EMPTY, Observable} from 'rxjs';

import {IFormField, FieldType, ReferenceType, ListComponent, EditComponent, ResourceSchema, ReferenceDataSource, BaseAction} from '../../shared/entity-admin';
import {objetivoResource} from './objetivo.resource';
import {EntityBase} from '../../shared/model/models';

// HACK: Passar função 'getCategoriaObjetivoResource', ao invés de 'categoriaObjetivoResource', no campo 'data' para permitir verificação estática do modo AOT
export const categoriaObjetivoRoutes: Route[] = [
    {path: 'categoriaObjetivos', component: ListComponent, data: {schema: getCategoriaObjetivoResource}},
    {path: 'categoriaObjetivos/edit', component: EditComponent, resolve: {schema: getCategoriaObjetivoResource}},
    {path: 'categoriaObjetivos/edit/:id', component: EditComponent, resolve: {schema: getCategoriaObjetivoResource}}
];

export function getCategoriaObjetivoResource() {
    return categoriaObjetivoResource;
}

/*export function getCategoriaObjetivoResource(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ResourceSchema {
    return categoriaObjetivoResource;
}*/

@Injectable()
export class ChangeScopeAction extends BaseAction<EntityBase> {
    public form: FormGroup;

    constructor() {
        super();
    }

    public isEnabled(): boolean {
        return true;
    }

    public execute(): Observable<EntityBase> {
        const control = this.form.get('escopo.id');
        control.setValue((+control.value + 1).toString())
        return EMPTY;
    }
}

export const categoriaObjetivoResource = new ResourceSchema('categoriaObjetivos', {
    listView: {
        fields: [
            {source: 'escopo.descricao'},
            {source: 'nome'},
            {source: 'descricao', hidden: true},
            {source: 'indicadorInternoSistema', type: FieldType.Boolean},
        ],
        orders: ['nome desc']
    },
    formView: {
        fields: [
            {
                source: 'nome',
                type: FieldType.Text,
                defaultValue: field => new Date().toISOString(),
                validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
            },
            <IFormField<string>> {
                source: 'descricao',
                type: FieldType.Text,
                validators: Validators.required,
                // onChange: (value, form, fields) => form.get('escopo.id').setValue(value.length)
            },
            {
                source: 'indicadorInternoSistema',
                type: FieldType.Boolean,
                // onChange: (value, form) => value ? form.controls.nome.disable() : form.controls.nome.enable()
                // onChange: (value, form) => this.categoriaObjetivos.formView.fields[0].hidden = value
                onChange: (value, form, fields) => fields.nome.hidden = value
            },
            {
                source: 'escopo', type: FieldType.Group, fields: [{
                    source: 'id',
                    type: FieldType.Reference,
                    dataSource: new ReferenceDataSource('escopos'),
                    validators: Validators.required
                }]
            }
        ],
        actions: [
            {label: 'Alterar Escopo', icon: '', action: ChangeScopeAction}
        ],
        references: [
            {
                resource: 'objetivos',
                type: ReferenceType.OneToMany,
                target: 'categoriaObjetivo.id',
                ...objetivoResource
            },
            {
                resource: 'objetivos',
                type: ReferenceType.OneToMany,
                target: 'categoriaObjetivoPrimaria.id',
                ...objetivoResource
            },
            {
                resource: 'entidades',
                type: ReferenceType.ManyToMany,
                target: 'categoriasObjetivos',
                targetInverse: 'entidades',
                listView: {
                    fields: [
                        {source: 'nome'},
                        {source: 'descricao'},
                        /*{source: 'carteiraAtividades.nome'},
                         {source: 'planoAnualAtivo.nome'},*/
                        {source: 'dataInicio', type: FieldType.Date},
                        {source: 'dataFim', type: FieldType.Date},
                    ],
                    orders: ['nome']
                },
                formView: {
                    fields: [
                        {source: 'nome', type: FieldType.Text},
                        {source: 'descricao', type: FieldType.Text},
                        {source: 'codigoCarteiraAtiva', type: FieldType.Text},
                        /*{
                         source: 'carteiraAtividades',
                         referencePath: 'carteiraAtividades',
                         type: FieldType.Reference,
                         select: {value: 'id', text: 'nome'}
                         },*/
                        {
                            source: 'planoAnualAtivo',
                            type: FieldType.Reference,
                            dataSource: new ReferenceDataSource('planoAnual', 'id', 'numero'),
                        },
                        {source: 'dataInicio', type: FieldType.Date},
                        {source: 'dataFim', type: FieldType.Date},
                        {source: 'codigoImportacao', type: FieldType.Text, readOnly: true}
                    ],
                    references: [
                        {
                            resource: 'categoriaObjetivos',
                            type: ReferenceType.ManyToMany,
                            target: 'entidades',
                            listView: {
                                fields: [
                                    {source: 'escopo.descricao'},
                                    {source: 'nome'},
                                    {source: 'descricao', hidden: true},
                                    {source: 'indicadorInternoSistema', type: FieldType.Boolean},
                                ],
                                orders: ['nome desc']
                            },
                            formView: {
                                fields: [
                                    {source: 'nome', type: FieldType.Text},
                                    {source: 'descricao', type: FieldType.Text},
                                    {source: 'indicadorInternoSistema', type: FieldType.Boolean},
                                    {
                                        source: 'escopo',
                                        type: FieldType.Reference,
                                        dataSource: new ReferenceDataSource('escopos')
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
});

export const categoriaObjetivoProviders = [
    {provide: getCategoriaObjetivoResource, useValue: getCategoriaObjetivoResource},
    ChangeScopeAction
];
