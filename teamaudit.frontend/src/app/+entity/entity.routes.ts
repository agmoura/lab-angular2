import {Routes, RouterModule} from '@angular/router';
import {EntityListComponent} from "./entity-list.component";
import {EntityEditComponent} from "./entity-edit.component";
import {ModuleWithProviders} from "@angular/core";

const entityRoutes: Routes = [
    {path: 'entity/:entity', component: EntityListComponent},
    {path: 'entity/:entity/edit', component: EntityEditComponent},
    {path: 'entity/:entity/edit/:id', component: EntityEditComponent}
];

export const entityRouting: ModuleWithProviders = RouterModule.forChild(entityRoutes);