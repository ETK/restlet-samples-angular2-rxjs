import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HttpModule, Http,
  XHRBackend, RequestOptions
} from '@angular/http';

import { AppComponent } from './app.component';
import { ErrorNotifierService } from './services/error.notifier';
import { CustomHttp } from './services/custom.http';
import { AppRequestOptions, WEBAPI_URL_TOKEN } from './services/app.request.options';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ErrorNotifierService,
    {
      provide: Http,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, errorNotifier: ErrorNotifierService) => {
        return new CustomHttp(backend, defaultOptions, errorNotifier);
      },
      deps: [ XHRBackend, RequestOptions, ErrorNotifierService ]
    },
    {
      provide: WEBAPI_URL_TOKEN, useValue: 'https://bookapi.apispark.net/v1'
    },
    {
      provide: RequestOptions, useClass: AppRequestOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
