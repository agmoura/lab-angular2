import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {objetivoRoutes} from "./objetivo/objetivo.routes";

const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'masterdata', loadChildren: "./master-data/master-data.module#MasterDataModule"},
    {path: 'riskmanagement', loadChildren: "./risk-management/risk-management.module#RiskManagementModule"},
    ...objetivoRoutes
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
