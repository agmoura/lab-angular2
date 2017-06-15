import {Routes} from "@angular/router";
import {ResourceSchemaBase, FieldType, ReferenceType, ListComponent, EditComponent} from "../../+entity-admin";
import {objetivoResource} from "./objetivo.resource";

export const categoriaObjetivoRoutes: Routes = [
    {path: 'categoriaObjetivos', component: ListComponent, data: {schema: getCategoriaObjetivoResource}},
    {path: 'categoriaObjetivos/edit', component: EditComponent, resolve: {schema: getCategoriaObjetivoResource}},
    {path: 'categoriaObjetivos/edit/:id', component: EditComponent, resolve: {schema: getCategoriaObjetivoResource}}
];

export const categoriaObjetivoProvider = {provide: getCategoriaObjetivoResource, useValue: getCategoriaObjetivoResource};

export function getCategoriaObjetivoResource() {
    return categoriaObjetivoResource;
}

/*export function getCategoriaObjetivoResource(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ResourceSchema {
    return categoriaObjetivoResource;
}*/

export const categoriaObjetivoResource = new ResourceSchemaBase('categoriaObjetivos', {
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
            {source: 'escopo', type: FieldType.Reference, select: {value: 'id', text: 'nome'}}
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
                            referencePath: 'planoAnual',
                            type: FieldType.Reference,
                            select: {value: 'id', text: 'numero'}
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
                                    {source: 'escopo', type: FieldType.Reference, select: {value: 'id', text: 'nome'}}
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
});
