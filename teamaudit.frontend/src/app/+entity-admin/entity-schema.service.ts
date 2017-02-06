import {Injectable} from '@angular/core';
import {EntitySchema, EntitySchemaMap, FieldType, RelationshipType} from "../shared/model/schema";

@Injectable()
export class EntitySchemaService {

    private entitySchemaMap: EntitySchemaMap = {
        escopo: {
            listView: {
                fields: [
                    {path: 'nome'},
                    {path: 'descricao'}
                ],
                orders: ['nome asc']
            },
            formView: {
                fields: [
                    {path: 'nome', type: FieldType.Text, required: true},
                    {path: 'descricao', type: FieldType.Text}
                ]
            }
        },
        categoriaObjetivo: {
            listView: {
                fields: [
                    {path: 'escopo.descricao'},
                    {path: 'nome'},
                    {path: 'descricao', hidden: true}
                ],
                orders: ['nome desc']
            },
            formView: {
                fields: [
                    {path: 'nome', type: FieldType.Text},
                    {path: 'descricao', type: FieldType.Text},
                    {path: 'indicadorInternoSistema', type: FieldType.Boolean},
                    {path: 'escopo', type: FieldType.Reference, select: {value: 'id', text: 'nome'}}
                ],
                relationships: [
                    {
                        path: 'objetivo',
                        type: RelationshipType.OneToMany,
                        listView: {
                            fields: [
                                {path: 'categoriaObjetivo.escopo.nome'},
                                {path: 'categoriaObjetivo.nome'},
                                {path: 'nome'},
                                {path: 'descricao'}
                            ],
                            orders: ['nome asc']
                        },
                        formView: {
                            fields: [
                                {path: 'nome', type: FieldType.Text, required: true},
                                {path: 'descricao', type: FieldType.Text, required: true},
                                {path: 'descricaoMeta', type: FieldType.Text},
                                {path: 'valorMeta', type: FieldType.Number},
                                {path: 'percentualMeta', type: FieldType.Number},
                                {path: 'categoriaObjetivo', type: FieldType.Reference, select: {value: 'id', text: 'nome'}},
                                {path: 'unidadeOrganizacional', type: FieldType.Reference, select: {value: 'id', text: 'nome'}}
                            ]
                        }
                    },
                    {
                        path: 'entidade',
                        type: RelationshipType.OneToMany,
                        listView: {
                            fields: [
                                {path: 'nome'},
                                {path: 'descricao'},
                                /*{path: 'carteiraAtividades.nome'},
                                 {path: 'planoAnualAtivo.nome'},*/
                                {path: 'dataInicio'},
                                {path: 'dataFim'},
                            ]
                        },
                        formView: {
                            fields: [
                                {path: 'nome', type: FieldType.Text},
                                {path: 'descricao', type: FieldType.Text},
                                {path: 'carteiraAtividades.numeroAno', type: FieldType.Number},
                                {
                                    path: 'carteiraAtividades',
                                    referencePath: 'carteiraAtividades',
                                    type: FieldType.Reference,
                                    select: {value: 'id', text: 'nome'}
                                },
                                {
                                    path: 'planoAnualAtivo',
                                    referencePath: 'planoAnual',
                                    type: FieldType.Reference,
                                    select: {value: 'id', text: 'nome'}
                                },
                                {path: 'dataInicio', type: FieldType.Date},
                                {path: 'dataFim', type: FieldType.Date},
                                {path: 'codigoImportacao', type: FieldType.Text, readOnly: true}
                            ]
                        }
                    }
                ]
            }
        },
        objetivo: {
            listView: {
                fields: [
                    {path: 'categoriaObjetivo.escopo.nome', hidden: true},
                    {path: 'categoriaObjetivo.nome'},
                    {path: 'nome'},
                    {path: 'descricao'}
                ],
                orders: ['nome asc']
            },
            formView: {
                fields: [
                    {path: 'nome', type: FieldType.Text, required: true},
                    {path: 'descricao', type: FieldType.Text, required: true},
                    {path: 'descricaoMeta', type: FieldType.Text},
                    {path: 'valorMeta', type: FieldType.Number},
                    {path: 'percentualMeta', type: FieldType.Number},
                    {path: 'categoriaObjetivo', type: FieldType.Reference, select: {value: 'id', text: 'nome'}},
                    {path: 'unidadeOrganizacional', type: FieldType.Reference, select: {value: 'id', text: 'nome'}}
                ]
            }
        },

        entidade: {
            listView: {
                fields: [
                    {path: 'nome'},
                    {path: 'descricao'},
                    /*{path: 'carteiraAtividades.nome'},
                     {path: 'planoAnualAtivo.nome'},*/
                    {path: 'dataInicio'},
                    {path: 'dataFim'},
                ]
            },
            formView: {
                fields: [
                    {path: 'nome', type: FieldType.Text},
                    {path: 'descricao', type: FieldType.Text},
                    {path: 'carteiraAtividades.numeroAno', type: FieldType.Number},
                    {
                        path: 'carteiraAtividades',
                        referencePath: 'carteiraAtividades',
                        type: FieldType.Reference,
                        select: {value: 'id', text: 'nome'}
                    },
                    {
                        path: 'planoAnualAtivo',
                        referencePath: 'planoAnual',
                        type: FieldType.Reference,
                        select: {value: 'id', text: 'nome'}
                    },
                    {path: 'dataInicio', type: FieldType.Date},
                    {path: 'dataFim', type: FieldType.Date},
                    {path: 'codigoImportacao', type: FieldType.Text, readOnly: true}
                ],
                relationships: [
                    {
                        path: 'auditorEquipe',
                        type: RelationshipType.ManyToMany,
                        parentId: {path: 'entidade.id'},
                        listView: {
                            fields: [
                                {path: 'especialista.nome'},
                                {path: 'participacaoAtividade.nome'},
                                {path: 'entidade.nome'},
                                {path: 'atribuicaoEspecialistaEquipeAuditora'},
                                {path: 'dataInicio'},
                                {path: 'dataFim'}
                            ]
                        },
                        formView: {
                            fields: [
                                {path: 'especialista', type: FieldType.Reference, select: {value: 'id', text: 'nome'}},
                                {path: 'dataInicio', type: FieldType.Date},
                                {path: 'dataFim', type: FieldType.Date},
                                {path: 'participacaoAtividade', referencePath: 'participacaoAtividade', type: FieldType.Reference, select: {value: 'id', text: 'nome'}},
                                {path: 'atribuicaoEspecialistaEquipeAuditora', type: FieldType.Text}
                            ]
                        }
                    },
                    {
                        path: 'entidadeOrganizacionalEquipe',
                        type: RelationshipType.ManyToMany,
                        parentId: {path: 'entidade.id'},
                        listView: {
                            fields: [
                                {path: 'entidade.nome'},
                                {path: 'estrutura.nome'},
                            ]
                        },
                        formView: {
                            fields: [
                                {path: 'estrutura', type: FieldType.Reference, select: {value: 'id', text: 'nome'}}
                            ]
                        }
                    }
                ]
            }
        }

        /*,
         classificacaoRisco: {
         label: {singular: 'Classificação de Risco', plural: 'Classificações de Risco'},
         id: {path: 'id'},
         listView: {
         fields: [
         {label: 'Nome', path: 'nome'},
         {label: 'Descrição', path: 'descricao'}
         ],
         sorts: ['nome asc']
         },
         formView: {
         fields: [
         {label: 'Nome', path: 'nome', type: 'text', required: true},
         {label: 'Descrição', path: 'descricao', type: 'text'},
         {label: 'Nível', path: 'numeroNivel', type: 'number'}
         ]
         }
         },
         categoriaRisco: {
         label: {singular: 'Categoria de Risco', plural: 'Categorias de Risco'},
         id: {path: 'id'},
         listView: {
         fields: [
         /!*{label: 'Pai', path: 'categoriaRiscoPai.nome'},*!/
         {label: 'Classificação', path: 'classificacaoRisco.nome'},
         {label: 'Nome', path: 'nome'},
         {label: 'Descrição', path: 'descricao'}
         ],
         sorts: ['nome asc']
         },
         formView: {
         fields: [
         {label: 'Pai', path: 'categoriaRiscoPai', referencePath: 'categoriaRisco', type: 'select', select: {value: 'id', text: 'nome'}},
         {label: 'Nome', path: 'nome', type: 'text'},
         {label: 'Descrição', path: 'descricao', type: 'text'},
         {label: 'Interno', path: 'indicadorInternoSistema', type: 'text'},
         {label: 'Classificação', path: 'classificacaoRisco', type: 'select', select: {value: 'id', text: 'nome'}}
         ]
         }
         }*/


    };

    constructor() {
        // Atribuir Índice de Todos Campos da Visão de Listagem
        for (var attribute in this.entitySchemaMap) {
            var entitySchema = this.entitySchemaMap[attribute];
            this.setupEntitySchema(entitySchema, attribute);
            if (entitySchema.formView.relationships) {
                entitySchema.formView.relationships.forEach(
                    relationship => this.setupEntitySchema(relationship, relationship.path)
                );
            }
        }
    }

    private setupEntitySchema(entitySchema: EntitySchema, entityPath: string) {
        entitySchema.listView.fields.forEach((item, index) => this.setupFieldSchema(entityPath, item, index));
        entitySchema.formView.fields.forEach((item, index) => this.setupFieldSchema(entityPath, item, index));
    }

    private setupFieldSchema(entityPath, item, index) {
        item.index = index;
        if (!item.label) item.label = (entityPath + '.' + item.path).toUpperCase();
    }

    public getEntitySchema(entityPath: string): EntitySchema {
        return this.entitySchemaMap[entityPath];
    }
}