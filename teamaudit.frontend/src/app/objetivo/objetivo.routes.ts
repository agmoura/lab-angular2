import {RouterConfig}          from '@angular/router';
import {ObjetivoListComponent} from "./objetivo-list.component";
import {ObjetivoEditComponent} from "./objetivo-edit.component";

export const objetivoRoutes:RouterConfig = <RouterConfig> [
    {path: 'objetivos', component: ObjetivoListComponent},
    {path: 'objetivos/edit', component: ObjetivoEditComponent},
    {path: 'objetivos/edit/:id', component: ObjetivoEditComponent}
];