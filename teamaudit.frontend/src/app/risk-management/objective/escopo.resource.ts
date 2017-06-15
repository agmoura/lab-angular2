import {ResourceSchemaFactory, FieldType} from "../../+entity-admin";

export const escopoResource = ResourceSchemaFactory.create('escopos', {
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