import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {EditComponent} from "./detail/edit.component";
import {ModuleWithProviders} from "@angular/core";

const entityAdminRoutes: Routes = [
    {path: 'entity/:entity', component: ListComponent},
    {path: 'entity/:entity/edit', component: EditComponent},
    {path: 'entity/:entity/edit/:id', component: EditComponent}
];

export const entityAdminRouting: ModuleWithProviders = RouterModule.forChild(entityAdminRoutes);