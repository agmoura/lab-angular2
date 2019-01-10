import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RiskRoutingModule} from "./risk-routing.module";
import {CategoriaRiscoComponent} from "./categoria-risco.component";
import {CategoriaRiscoService} from "./categoria-risco.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RiskRoutingModule
    ],
    declarations: [
        CategoriaRiscoComponent,
    ],
    providers: [
        CategoriaRiscoService
    ]
})
export class RiskModule {

}
