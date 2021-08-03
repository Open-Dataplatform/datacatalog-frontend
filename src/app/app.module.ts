import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from "./components/header/header.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { HomeModule } from "./pages/home/home.module";
import { ErrorInterceptService } from "./shared/error-intercept/error-intercept.service";
import { GlobalErrorHandler } from "./shared/logging/global-error-handler.service";
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserHandlerService } from "./shared/user/user-handler.service";
import { environment } from '../environments/environment';
import { API_BASE_URL } from './shared/api/api';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export function getTranslateConfig() {
  return {
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    TranslateModule.forRoot(getTranslateConfig()),
    HttpClientModule,
    SharedModule,
    HeaderModule,
    HomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: ErrorInterceptService,
      multi:    true
    },
    {
      provide:  ErrorHandler, 
      useClass: GlobalErrorHandler
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    {
      provide  : APP_BASE_HREF, 
      useValue : environment.baseHref 
    },
    {
      provide  : API_BASE_URL, 
      useValue : environment.base
    },
    UserHandlerService,
    { 
      provide: APP_INITIALIZER,
      useFactory: (userHandlerService : UserHandlerService) => () => userHandlerService.initialize(), 
      deps: [UserHandlerService], 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }