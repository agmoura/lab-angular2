import {NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import {categoriaObjetivoRoutes, categoriaObjetivoProvider} from "./objective/categoria-objetivo.resource";

const routes: Routes = [
    ...categoriaObjetivoRoutes
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        categoriaObjetivoProvider
    ]
})
export class RiskManagementRoutingModule {
}