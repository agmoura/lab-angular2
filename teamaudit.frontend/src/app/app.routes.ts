import {provideRouter, RouterConfig} from '@angular/router';
import {About} from './about/about';
import {Home} from './home/home';
import {objetivoRoutes} from "./objetivo/objetivo.routes";

const routes:RouterConfig = [
    {path: '', redirectTo: 'home', terminal: true},
    {path: 'home', component: Home},
    ...objetivoRoutes,
    {path: 'about', component: About}
];

export const appRouterProviders = [
    provideRouter(routes)
];