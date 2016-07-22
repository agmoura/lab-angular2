import {RouterConfig}          from '@angular/router';
import {ObjetivoListComponent} from "./objetivo-list.component";
import {ObjetivoEditComponent} from "./objetivo-edit.component";

export const objetivoRoutes:RouterConfig = <RouterConfig> [
    {path: 'objetivo', component: ObjetivoListComponent},
    {path: 'objetivo/edit', component: ObjetivoEditComponent},
    {path: 'objetivo/edit/:id', component: ObjetivoEditComponent}
];