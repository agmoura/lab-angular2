import {Route} from "@angular/router";
import {FieldType, ListComponent, EditComponent, ResourceSchema} from '../../shared/entity-admin';

export const escopoRoutes: Route[] = [
    {path: 'escopos', component: ListComponent, data: {schema: getEscopoResource}},
    {path: 'escopos/edit', component: EditComponent, data: {schema: getEscopoResource}},
    {path: 'escopos/edit/:id', component: EditComponent, data: {schema: getEscopoResource}}
];

export function getEscopoResource() {
    return escopoResource;
}

export const escopoResource = new ResourceSchema('escopos', {
    listView: {
        fields: [
            {source: 'nome'},
            {source: 'descricao'}
        ],
        orders: ['nome asc']
    },
    formView: {
        fields: [
            {source: 'nome', type: FieldType.Text, required: true},
            {source: 'descricao', type: FieldType.Text}
        ]
    }
});