import {Injectable} from '@angular/core';
import {ResourceSchema, ResourceSchemaMap, FieldType, ReferenceType} from "../shared/model/schema";

@Injectable()
export class EntitySchemaService {

    private resourceSchemaMap: ResourceSchemaMap = {
        escopo: {
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
        },
        categoriaObjetivo: {
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
                        resource: 'objetivo',
                        type: ReferenceType.OneToMany,
                        target: 'categoriaObjetivo.id',
                        listView: {
                            fields: [
                                {source: 'categoriaObjetivo.escopo.nome', hidden: true},
                                {source: 'categoriaObjetivo.nome', hidden: true},
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
                                {source: 'categoriaObjetivoPrimaria', /*reference:'categoriaObjetivo',*/ type: FieldType.Reference, select: {value: 'id', text: 'nome'}},
                                {source: 'unidadeOrganizacional', type: FieldType.Reference, select: {value: 'id', text: 'nome'}}
                            ]
                        }
                    },
                    {
                        resource: 'objetivo',
                        type: ReferenceType.OneToMany,
                        target: 'categoriaObjetivoPrimaria.id',
                        listView: {
                            fields: [
                                {source: 'categoriaObjetivo.escopo.nome', hidden: true},
                                {source: 'categoriaObjetivo.nome', hidden: true},
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
                    },
                    {
                        resource: 'entidade',
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
                                    resource: 'categoriaObjetivo',
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
        },
        objetivo: {
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
        },

        entidade: {
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
        },

        auditLog: {
            listView: {
                fields: [
                    {source: 'entityName'},
                    {source: 'entityId'},
                    {source: 'operation'},
                    {source: 'dateCreated', type: FieldType.Date},
                    {source: 'user'}
                ]
            },
            formView: {
                fields: [
                    {source: 'entityName', type: FieldType.Text},
                    {source: 'entityId', type: FieldType.Text},
                    {source: 'operation', type: FieldType.Text},
                    {source: 'dateCreated', type: FieldType.Date},
                    {source: 'user', type: FieldType.Text}
                ],
                references: [
                    {
                        resource: 'auditLogItem',
                        type: ReferenceType.OneToMany,
                        target: 'auditLog.id',
                        listView: {
                            fields: [
                                {source: 'field'},
                                {source: 'oldValue'},
                                {source: 'newValue'}
                            ]
                        },
                        formView: {
                            fields: [
                                {source: 'field', type: FieldType.Text},
                                {source: 'oldValue', type: FieldType.Text},
                                {source: 'newValue', type: FieldType.Text}
                            ]
                        }
                    }
                ]
            }
        }

    };

    constructor() {
        // Atribuir Índice de Todos Campos da Visão de Listagem
        for (var attribute in this.resourceSchemaMap) {
            var schema = this.resourceSchemaMap[attribute];
            this.setupSchema(schema, attribute);
        }
    }

    private setupSchema(schema: ResourceSchema, source: string) {
        schema.listView.fields.forEach((item, index) => this.setupFieldSchema(source, item, index));
        schema.formView.fields.forEach((item, index) => this.setupFieldSchema(source, item, index));

        if (schema.formView.references) {
            schema.formView.references.forEach(
                item => this.setupSchema(item, item.resource)
            );
        }

    }

    private setupFieldSchema(source, item, index) {
        item.index = index;
        if (!item.label) item.label = (source + '.' + item.source).toUpperCase();
    }

    public getSchema(resource: string): ResourceSchema {
        return this.resourceSchemaMap[resource];
    }
}