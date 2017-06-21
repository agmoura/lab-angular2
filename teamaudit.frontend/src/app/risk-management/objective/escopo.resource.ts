import {Routes} from "@angular/router";
import {ResourceSchemaBase, FieldType, ListComponent, EditComponent} from "../../+entity-admin";

export const escopoRoutes: Routes = [
    {path: 'escopos', component: ListComponent, data: {schema: getEscopoResource}},
    {path: 'escopos/edit', component: EditComponent, data: {schema: getEscopoResource}},
    {path: 'escopos/edit/:id', component: EditComponent, data: {schema: getEscopoResource}}
];

export function getEscopoResource() {
    return escopoResource;
}

export const escopoResource = new ResourceSchemaBase('escopos', {
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