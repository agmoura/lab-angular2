import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {CategoriaRiscoComponent} from "./categoria-risco.component";

const routes: Routes = [
    // {path: 'classificacaoRiscos', component: CategoriaRiscoComponent},
    {path: 'categoriaRiscos', component: CategoriaRiscoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RiskRoutingModule {
}
