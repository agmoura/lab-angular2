import {Routes}          from '@angular/router';
import {ObjetivoListComponent} from "./objetivo-list.component";
import {ObjetivoEditComponent} from "./objetivo-edit.component";

export const objetivoRoutes:Routes = [
    {path: 'objetivo', component: ObjetivoListComponent},
    {path: 'objetivo/edit', component: ObjetivoEditComponent},
    {path: 'objetivo/edit/:id', component: ObjetivoEditComponent}
];