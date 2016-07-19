import {bootstrap} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {appRouterProviders} from './app/app.routes';
import {AppComponent} from './app/app.component';

// import {enableProdMode} from '@angular/core';
// enableProdMode();

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    appRouterProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    disableDeprecatedForms(),
    provideForms()
]).catch(error => console.error(error));