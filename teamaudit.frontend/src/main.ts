import {bootstrap} from '@angular/platform-browser-dynamic';
import {Type} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {appRouterProviders} from './app/app.routes';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {AppComponent} from './app/app.component';

bootstrap(<Type> AppComponent, [
    HTTP_PROVIDERS,
    appRouterProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    disableDeprecatedForms(),
    provideForms(),
]).catch(error => console.error(error));