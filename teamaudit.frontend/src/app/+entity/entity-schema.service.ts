import {Injectable} from '@angular/core';
import {EntitySchema, EntitySchemaMap} from "../shared/model/schema";

@Injectable()
export class EntitySchemaService {

    private entitySchemaMap:EntitySchemaMap = {
        escopo: {
            label: {singular: 'Escopo', plural: 'Escopos'},
            id: {path: 'id'},
            listView: {
                fields: [
                    {label: 'Nome', path: 'nome', required: true},
                    {label: 'Descrição', path: 'descricao'}
                ],
                sorts: ['nome asc']
            },
            formView: {
                fields: [
                    {label: 'Nome', path: 'nome', type: 'text', required: true},
                    {label: 'Descrição', path: 'descricao', type: 'text'}
                ]
            }
        },
        categoriaObjetivo: {
            label: {singular: 'Categoria de Objetivo', plural: 'Categorias de Objetivo'},
            id: {path: 'id'},
            listView: {
                fields: [
                    {label: 'Escopo', path: 'escopo.descricao'},
                    {label: 'Nome', path: 'nome', required: true},
                    {label: 'Descrição', path: 'descricao'}
                ],
                sorts: ['nome desc']
            },
            formView: {
                fields: [
                    {label: 'Nome', path: 'nome', type: 'text'},
                    {label: 'Descrição', path: 'descricao', type: 'text'},
                    {label: 'Interno', path: 'indicadorInternoSistema', type: 'text'},
                    {label: 'Escopo', path: 'escopo', type: 'select', select: {value: 'id', text: 'nome'}}
                ]
            }
        },
        objetivo: {
            label: {singular: 'Objetivo', plural: 'Objetivos'},
            id: {path: 'id'},
            listView: {
                fields: [
                    {label: 'Escopo', path: 'categoriaObjetivo.escopo.nome'},
                    {label: 'Categoria', path: 'categoriaObjetivo.nome'},
                    {label: 'Nome', path: 'nome'},
                    {label: 'Descrição', path: 'descricao'}
                ],
                sorts: ['nome asc']
            },
            formView: {
                fields: [
                    {label: 'Nome', path: 'nome', type: 'text', required:true},
                    {label: 'Descrição', path: 'descricao', type: 'text', required:true},
                    {label: 'Descrição Meta', path: 'descricaoMeta', type: 'text'},
                    {label: 'Valor Meta', path: 'valorMeta', type: 'number'},
                    {label: 'Percentual Meta', path: 'percentualMeta', type: 'number'},
                    {label: 'Categoria', path: 'categoriaObjetivo', type: 'select', select: {value: 'id', text: 'nome'}},
                    {label: 'Unidade', path: 'unidadeOrganizacional', type: 'select', select: {value: 'id', text: 'nome'}}
                ]
            }
        },
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
                    /*{label: 'Pai', path: 'categoriaRiscoPai.nome'},*/
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
        }


    };

    constructor() {
    }

    public getEntitySchema(entityPath:string):EntitySchema {
        return this.entitySchemaMap[entityPath];
    }
}