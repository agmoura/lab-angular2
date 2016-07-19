import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Objetivo, CategoriaObjetivo, UnidadeOrganizacional} from "../shared/model/models";
import {DataService} from "../shared/services/data.service";

@Component({
    selector: 'objetivo-edit',
    templateUrl: './objetivo-edit.component.html',
    //styleUrls: ['./app.css'],
    moduleId: module.id,
    providers: [DataService]
})
export class ObjetivoEditComponent implements OnInit {

    errors:string[] = [];
    subscription:any;
    objetivo:Objetivo = new Objetivo();
    categoriaObjetivos:CategoriaObjetivo[] = [];
    unidades:UnidadeOrganizacional[] = [];

    constructor(private route:ActivatedRoute, private dataService:DataService) { }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            params => this.load(params['id'])
        );
    }

    load(id:string) {
        if (id)
            this.dataService.get<Objetivo>('objetivos', id).subscribe(
                data => this.objetivo = data
            );

        this.dataService.findAll<CategoriaObjetivo>('categoriaObjetivos').subscribe(
            data => this.categoriaObjetivos = data.list
        );

        this.dataService.findAll<CategoriaObjetivo>('unidades').subscribe(
            data => this.unidades = data.list
        );
    }

    save() {
        this.dataService.save('objetivos', <Objetivo>this.objetivo).subscribe(
            data => this.objetivo = data,
            error => this.handleError(error.json()),
            () => this.goBack()
        );
    }

    goBack() {
        window.history.back();
    }

    handleError(data:any) {

        this.errors.length = 0;

        // Handle Bean Validations
        if (data.errors) {
            this.errors = data.errors.map(e => e.property + ' - ' + e.message);
        }

        // Handle Other Exceptions
        else if (data.message) {
            this.errors.push(data.message);
            while (data.cause) {
                data = data.cause;
                this.errors.push(data.message);
            }
        }
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        return JSON.stringify(this.objetivo);
    }

}
