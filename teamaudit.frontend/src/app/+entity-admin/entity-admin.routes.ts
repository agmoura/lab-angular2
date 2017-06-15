import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {EditComponent} from "./detail/edit.component";

import {ResourceSchema} from "./model/schema";

const entityAdminRoutes: Routes = [
    {path: 'entity/:entity', component: ListComponent},
    {path: 'entity/:entity/edit', component: EditComponent},
    {path: 'entity/:entity/edit/:id', component: EditComponent}
];

export function buildRoutes(resourceSchema: ResourceSchema): Routes {
    const data = {schema: resourceSchema};

    return [
        {path: `${resourceSchema.resource}`, component: ListComponent, data: data},
        {path: `${resourceSchema.resource}/edit`, component: EditComponent, data: data},
        {path: `${resourceSchema.resource}/edit/:id`, component: EditComponent, data: data}
    ];
}

export const entityAdminRouting: ModuleWithProviders = RouterModule.forChild(entityAdminRoutes);