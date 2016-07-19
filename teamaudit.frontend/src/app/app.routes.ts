import { provideRouter, RouterConfig } from '@angular/router';
import {About} from './about/about';
import {Home} from './home/home';
import {ObjetivoListComponent} from "./objetivo/objetivo-list.component";
import {ObjetivoEditComponent} from "./objetivo/objetivo-edit.component";


const routes: RouterConfig = [
    { path: '', redirectTo: 'home', terminal: true },
    { path: 'home', component: Home },
    { path: 'objetivos', component: ObjetivoListComponent},
    { path: 'objetivos-edit', component: ObjetivoEditComponent },
    { path: 'objetivos-edit/:id', component: ObjetivoEditComponent },
    { path: 'about', component: About }
];

export const appRouterProviders = [
    provideRouter(routes)
];