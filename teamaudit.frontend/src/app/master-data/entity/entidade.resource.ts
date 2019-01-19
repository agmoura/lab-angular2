import {Route} from "@angular/router";
import {FieldType, ReferenceType, ReferenceDataSource, ListComponent, EditComponent, ResourceSchema} from '../../shared/entity-admin';

export const entidadeRoutes: Route[] = [
    {path: 'entidades', component: ListComponent, data: {schema: getEntidadeResource}},
    {path: 'entidades/edit', component: EditComponent, data: {schema: getEntidadeResource}},
    {path: 'entidades/edit/:id', component: EditComponent, data: {schema: getEntidadeResource}}
];

export function getEntidadeResource() {
    return entidadeResource;
}

export const entidadeResource = new ResourceSchema ('entidades', {
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
            {source: 'nome', type: FieldType.Text, required: true},
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
            {source: 'dataInicio', type: FieldType.Date, required: true},
            {source: 'dataFim', type: FieldType.Date, required: true},
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
                        {
                            source: 'especialista',
                            type: FieldType.Reference,
                            dataSource: new ReferenceDataSource('especialista')
                        },
                        {source: 'dataInicio', type: FieldType.Date},
                        {source: 'dataFim', type: FieldType.Date},
                        {
                            source: 'participacaoAtividade',
                            type: FieldType.Reference,
                            dataSource: new ReferenceDataSource('participacaoAtividade'),
                        },
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
                        {source: 'estrutura', type: FieldType.Reference, dataSource: new ReferenceDataSource('estrutura')}
                    ]
                }
            }
        ]
    }
});

