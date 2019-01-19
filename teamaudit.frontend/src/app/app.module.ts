import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {NgZorroAntdModule, NZ_I18N, en_US} from 'ng-zorro-antd';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {ExceptionModule} from './shared/exception/exception-module';
import {EntityAdminModule} from './shared/entity-admin/entity-admin.module';
import {FormSampleModule} from './-archive/form-sample/form-sample.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';

registerLocaleData(en);

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgZorroAntdModule,
        TranslateModule.forRoot(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [HttpClient]
                }
            }
        ),
        AppRoutingModule,
        EntityAdminModule, // Force Eager Load Module
        FormSampleModule, // Old Form Samples Module
        ExceptionModule,
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
    ],
    bootstrap: [AppComponent],
    providers: [{provide: NZ_I18N, useValue: en_US}]
})
export class AppModule {
}
