import {Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable, NgModule} from "@angular/core";
// import {escopoResource} from "./objective/escopo.resource";
import {categoriaObjetivoResource, loadCategoriaObjetivoResource} from "./objective/categoria-objetivo.resource";
// import {objetivoResource} from "./objective/objetivo.resource";
import {ListComponent, EditComponent, ResourceSchemaBase} from "../+entity-admin";
import {ResourceSchema} from "../+entity-admin/model/schema";

// export const categoriaObjetivoData = {schema: categoriaObjetivoResource};

/*@Injectable()
 export class CategoriaObjetivosResolver implements Resolve<ResourceSchema> {
 resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ResourceSchema {
 return categoriaObjetivoResource;
 }
 }*/

const routes: Routes = [
    {path: 'categoriaObjetivos', component: ListComponent, resolve: {schema: 'categoriaObjetivoResource'}},
    {path: 'categoriaObjetivos/edit', component: EditComponent, resolve: {schema: 'categoriaObjetivoResource'}},
    {path: 'categoriaObjetivos/edit/:id', component: EditComponent, resolve: {schema: 'categoriaObjetivoResource'}}

    /*buildRoutes('escopo', escopoResource),
     buildRoutes('categoriaobjetivo', categoriaObjetivoResource),
     buildRoutes('objetivo', objetivoResource),*/
];

/*export function categoriaObjetivoResourceResolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ResourceSchema {
    return categoriaObjetivoResource;
}*/

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        {provide: 'categoriaObjetivoResource', useValue: loadCategoriaObjetivoResource}
    ]
})
export class RiskManagementRoutingModule {
}