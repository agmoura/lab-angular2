import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExceptionComponent} from "./exception.component";

const routes: Routes = [
    {path: 'error', component: ExceptionComponent},
    {path: 'forbiden', component: ExceptionComponent, data: {title: '403'}},
    {path: '**', component: ExceptionComponent, data: {title: '404'}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExceptionRoutingModule {
}
