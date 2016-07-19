import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Objetivo, CategoriaObjetivo} from "../shared/model/models";
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

    constructor(private route:ActivatedRoute, private dataService:DataService) {
        //this.objetivo = <Objetivo>{ };
        /*this.objetivo = <Objetivo>{
         _links: {
         categoriaObjetivo: {href: "http://localhost:8080/teamaudit/api/categoriaObjetivos/4028e7995603f0cc015603f0d4770010"},
         unidadeOrganizacional: {href: "http://localhost:8080/teamaudit/api/objetivos/4028e7995603f0cc015603f0d4780014/unidadeOrganizacional"}
         },
         categoriaObjetivo: {id: "4028e7995603f0cc015603f0d4770010"}
         };*/

        //this.objetivo = <Objetivo> { };
        //this.objetivo.categoriaObjetivo = <CategoriaObjetivo>{ };
    }

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
