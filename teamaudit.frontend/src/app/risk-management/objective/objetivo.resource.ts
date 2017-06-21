import {Routes} from "@angular/router";
import {ResourceSchemaBase, FieldType, ListComponent, EditComponent} from "../../+entity-admin";
import {RouteAction} from "../../+entity-admin/model/action-schema";

export const objetivoRoutes: Routes = [
    {path: 'objetivos', component: ListComponent, data: {schema: getObjetivoResource}},
    {path: 'objetivos/edit', component: EditComponent, data: {schema: getObjetivoResource}},
    {path: 'objetivos/edit/:id', component: EditComponent, data: {schema: getObjetivoResource}}
];

export function getObjetivoResource() {
    return objetivoResource;
}

export const objetivoResource = new ResourceSchemaBase('objetivos', {
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
            {source: 'categoriaObjetivo', type: FieldType.Reference, select: {value: 'id', text: 'nome'}},
            {source: 'unidadeOrganizacional', type: FieldType.Reference, select: {value: 'id', text: 'nome'}}
        ],
        actions: [

            new RouteAction<any>('Categoria', '', '/riskmanagement/categoriaObjetivos')
        ]
    }
});