import {Routes} from '@angular/router';
import {ObjetivoListComponent} from './objetivo-list.component';
import {ObjetivoEditComponent} from './objetivo-edit.component';
import {ObjetivoEditReactiveComponent} from './reactive/objetivo-edit-reactive.component';

export const formSampleRoutes: Routes = [
    {path: 'objetivo', component: ObjetivoListComponent},
    {path: 'objetivo/edit', component: ObjetivoEditReactiveComponent},
    {path: 'objetivo/edit/:id', component: ObjetivoEditReactiveComponent}
];