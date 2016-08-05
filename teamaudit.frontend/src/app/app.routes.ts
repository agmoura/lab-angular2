import {provideRouter, RouterConfig} from '@angular/router';
import {About} from './about/about';
import {Home} from './home/home';
import {entityRoutes} from "./+entity/entity.routes";
import {objetivoRoutes} from "./objetivo/objetivo.routes";
import {CategoriaRiscoComponent} from "./categoria-risco/categoria-risco.component";

const routes:RouterConfig = [
    {path: '', redirectTo: 'home', terminal: true},
    {path: 'home', component: Home},
    ...entityRoutes,
    ...objetivoRoutes,
    {path: 'categoria-risco', component: CategoriaRiscoComponent},
    {path: 'about', component: About}
];

export const appRouterProviders = [
    provideRouter(routes)
];