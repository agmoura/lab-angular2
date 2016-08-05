import {RouterConfig}        from '@angular/router';
import {EntityListComponent} from "./entity-list.component";
import {EntityEditComponent} from "./entity-edit.component";

export const entityRoutes:RouterConfig = <RouterConfig> [
    {path: 'entity/:entity', component: EntityListComponent},
    {path: 'entity/:entity/edit', component: EntityEditComponent},
    {path: 'entity/:entity/edit/:id', component: EntityEditComponent}
];