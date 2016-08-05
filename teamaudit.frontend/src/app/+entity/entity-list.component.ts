import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';

import {Objetivo, EntityBase} from "../shared/model/models";
import {DataService} from "../shared/services/data.service";
import {Page} from "../shared/model/paged-list";
import {HandleErrorsComponent} from "../shared/components/handle-errors.component";

@Component({
    selector: 'entity-list',
    templateUrl: './entity-list.component.html',
    moduleId: module.id,
    directives: [ROUTER_DIRECTIVES, HandleErrorsComponent],
    providers: [DataService]
})
export class EntityListComponent implements OnInit {

    routeSubscription:any;
    entityName:string;
    entitySchema:any;
    entityList = [];
    page:Page = new Page();
    errors:any;

    public static schemas:any = {
        escopo: {
            label: {singular: 'Escopo', plural: 'Escopos'},
            id: {path: 'id'},
            listView: {
                fields: [
                    {label: 'Nome2', path: 'nome'},
                    {label: 'Descrição2', path: 'descricao'}
                ],
                sorts: ['nome asc']
            },
            formView: {
                fields: [
                    {label: 'Nome', path: 'nome', type: 'text', required:true},
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
                    {label: 'Nome', path: 'nome'},
                    {label: 'Descrição', path: 'descricao'}
                ],
                sorts: ['nome desc']
            },
            formView: {
                fields: [
                    {label: 'Nome', path: 'nome', type: 'text'},
                    {label: 'Descrição', path: 'descricao', type: 'text'},
                    {label: 'Interno', path: 'indicadorInternoSistema', type: 'checkbox'},
                    {label: 'Escopo', path: 'escopo', type: 'select'}
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
                ]
            },
            formView: {
                fields: [
                    {label: 'Nome', path: 'nome', type: 'text'},
                    {label: 'Descrição', path: 'descricao', type: 'text'},
                    {label: 'Descrição Meta', path: 'descricaoMeta', type: 'text'},
                    {label: 'Valor Meta', path: 'valorMeta', type: 'number'},
                    {label: 'Percentual Meta', path: 'percentualMeta', type: 'number'},
                    {label: 'Categoria', path: 'categoriaObjetivo', type: 'select', select: {value: 'id', text: 'nome'}},
                    {label: 'Unidade', path: 'unidadeOrganizacional', type: 'select', select: {value: 'id', text: 'nome'}}
                ]
            }
        }
    };

    constructor(private route:ActivatedRoute, private router:Router, private dataService:DataService) {

    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            this.entityName = params['entity'];
            this.entitySchema = EntityListComponent.schemas[this.entityName];
            this.load();
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    load() {
        let projections = this.entitySchema.listView.fields.map(field => field.path);
        projections.splice(0, 0, this.entitySchema.id.path);

        this.dataService.findAll(this.entityName, this.page, this.entitySchema.listView.sorts, null, projections)
            .subscribe(
                data => {
                    this.entityList = data.list;
                    this.page = new Page(data.page);
                },
                error => this.errors = error
            );
    }

    previousPage() {
        this.page.number--;
        this.load();
    }

    nextPage() {
        this.page.number++;
        this.load();
    }

    delete(entity:any) {
        if (confirm('Tem certeza que deseja exluir esse registro ?')) {
            this.dataService.delete(this.entityName, entity[0]).subscribe(
                data => this.load(),
                error => this.errors = error
            );
        }
    }

    gotoEdit(entity:any = null) {
        if (entity)
            this.router.navigate(['entity', this.entityName, 'edit', entity[0]]);
        else
            this.router.navigate(['entity', this.entityName, 'edit']);
    }
}