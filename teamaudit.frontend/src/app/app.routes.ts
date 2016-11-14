import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CategoriaRiscoComponent} from "./categoria-risco/categoria-risco.component";
import {objetivoRoutes} from "./objetivo/objetivo.routes";

const rootRoutes: Routes = [
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'categoria-risco', component: CategoriaRiscoComponent},
    ...objetivoRoutes
];

export const rootRoutesModule: ModuleWithProviders = RouterModule.forRoot(rootRoutes, {useHash: true});