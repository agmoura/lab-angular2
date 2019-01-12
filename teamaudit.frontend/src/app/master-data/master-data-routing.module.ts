import {NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import {entidadeRoutes} from "./";

const routes: Routes = [
    ...entidadeRoutes
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MasterDataRoutingModule {
}