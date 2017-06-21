import {Routes} from "@angular/router";
import {ResourceSchemaBase, FieldType, ReferenceType, ListComponent, EditComponent} from "../../+entity-admin";

export const entidadeRoutes: Routes = [
    {path: 'entidades', component: ListComponent, data: {schema: getEntidadeResource}},
    {path: 'entidades/edit', component: EditComponent, data: {schema: getEntidadeResource}},
    {path: 'entidades/edit/:id', component: EditComponent, data: {schema: getEntidadeResource}}
];

export function getEntidadeResource() {
    return entidadeResource;
}

export const entidadeResource = new ResourceSchemaBase('entidades', {
    listView: {
        fields: [
            {source: 'nome'},
            {source: 'descricao'},
            /*{source: 'carteiraAtividades.nome'},
             {source: 'planoAnualAtivo.nome'},*/
            {source: 'dataInicio', type: FieldType.Date},
            {source: 'dataFim', type: FieldType.Date},
        ],
            orders: ['nome asc']
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
                resource: 'auditorEquipe',
                type: ReferenceType.OneToMany,
                target: 'entidade.id',
                listView: {
                    fields: [
                        {source: 'especialista.nome'},
                        {source: 'participacaoAtividade.nome'},
                        {source: 'entidade.nome'},
                        {source: 'atribuicaoEspecialistaEquipeAuditora'},
                        {source: 'dataInicio'},
                        {source: 'dataFim'}
                    ]
                },
                formView: {
                    fields: [
                        {source: 'especialista', type: FieldType.Reference, select: {value: 'id', text: 'nome'}},
                        {source: 'dataInicio', type: FieldType.Date},
                        {source: 'dataFim', type: FieldType.Date},
                        {source: 'participacaoAtividade', referencePath: 'participacaoAtividade', type: FieldType.Reference, select: {value: 'id', text: 'nome'}},
                        {source: 'atribuicaoEspecialistaEquipeAuditora', type: FieldType.Text}
                    ]
                }
            },
            {
                resource: 'entidadeOrganizacionalEquipe',
                type: ReferenceType.OneToMany,
                target: 'entidade.id',
                listView: {
                    fields: [
                        {source: 'entidade.nome'},
                        {source: 'estrutura.nome'},
                    ]
                },
                formView: {
                    fields: [
                        {source: 'estrutura', type: FieldType.Reference, select: {value: 'id', text: 'nome'}}
                    ]
                }
            }
        ]
    }
});
