import {ResourceSchemaBase, FieldType} from "../../+entity-admin";

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
        ]
    }
});