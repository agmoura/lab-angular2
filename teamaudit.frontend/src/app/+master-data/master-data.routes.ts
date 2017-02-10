import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {CategoriaObjetivoComponent} from "./categoria-objetivo.component";

const masterDataRoutes: Routes = [
    {path: 'masterdata/categoriaObjetivo', component: CategoriaObjetivoComponent}

];

export const masterDataRouting: ModuleWithProviders = RouterModule.forChild(masterDataRoutes);