import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {escopoRoutes} from './objective/escopo.resource';
import {categoriaObjetivoRoutes, categoriaObjetivoProviders} from './objective/categoria-objetivo.resource';
import {objetivoProviders, objetivoRoutes} from './objective/objetivo.resource';

const routes: Routes = [
    ...escopoRoutes,
    ...categoriaObjetivoRoutes,
    ...objetivoRoutes
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        ...categoriaObjetivoProviders,
        ...objetivoProviders
    ]
})
export class RiskManagementRoutingModule {
}