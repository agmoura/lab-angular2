import {Routes} from "@angular/router";
import {Injectable} from "@angular/core";
import {MdSnackBar} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {ResourceSchemaBase, BaseAction, RouteAction, FieldType, ListComponent, EditComponent} from "../../+entity-admin";
import {EntityBase} from "../../shared/model/models";
import {DataService} from "../../shared/services/data.service";
import {FormGroup} from "@angular/forms";

export const objetivoRoutes: Routes = [
    {path: 'objetivos', component: ListComponent, data: {schema: getObjetivoResource}},
    {path: 'objetivos/edit', component: EditComponent, data: {schema: getObjetivoResource}},
    {path: 'objetivos/edit/:id', component: EditComponent, data: {schema: getObjetivoResource}}
];

export function getObjetivoResource() {
    return objetivoResource;
}


@Injectable()
export class DuplicateObjetiveAction extends BaseAction<EntityBase> {
    public form: FormGroup;

    constructor(private dataService: DataService, public snackBar: MdSnackBar) {
        super();
    }

    public isEnabled(): boolean {
        return !!this.form.value.id;
    }

    public execute(): Observable<EntityBase> {
        const entity = this.form.value;
        entity.id = null;
        entity.nome +=  ' (Cópia)';
        this.dataService.save('objetivos', entity).subscribe(
            data => {},
            error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK'),
            () => this.snackBar.open('Cópia realizada com sucesso', 'OK', {duration: 2000})
        );

        return Observable.empty();
    }
}

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
        ],
        actions: [
            {label: 'Categoria', icon: '', data: {route: '/riskmanagement/categoriaObjetivos'}, action: RouteAction},
            {label: 'Escopo', icon: '', data: {route: '/riskmanagement/escopos'}, action: RouteAction},
            {label: 'Copiar Objetivo', icon: '', action: DuplicateObjetiveAction}
        ]
    }
});
