/*
import {ModuleWithProviders, NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CategoriaRiscoComponent} from "./categoria-risco/categoria-risco.component";
import {objetivoRoutes} from "./objetivo/objetivo.routes";
import {AdminComponent} from "./core/admin/admin.component";
import {EntityAdminModule} from "./entity-admin/entity-admin.module";
import {PageNotFoundComponent} from "./core/admin/not-found.component";

export function loadEntityAdminModule(){ return EntityAdminModule; }

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'categoria-risco', component: CategoriaRiscoComponent},
            // {path: 'entity', loadChildren: './entity-admin/entity-admin.module#EntityAdminModule'},
            {path: 'entity', loadChildren: loadEntityAdminModule},
            ...objetivoRoutes,
            {path: '**', component: PageNotFoundComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}*/
