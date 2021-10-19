import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import localeDa from '@angular/common/locales/da';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './components/header/header.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './pages/home/home.module';
import { ErrorInterceptService } from './shared/error-intercept/error-intercept.service';
import { GlobalErrorHandler } from './shared/logging/global-error-handler.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { OBO_USER_MANAGER_TOKEN, UserHandlerService } from './shared/user/user-handler.service';
import { environment } from '../environments/environment';
import { API_BASE_URL } from './shared/api/api';
import { UserManager } from 'oidc-client';
import { PreviewDataComponent } from './components/preview-data/preview-data.component';
import { MatTableModule } from '@angular/material/table';
import { registerLocaleData } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ProgressDialogComponent} from './components/progress-dialog/progress-dialog.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

registerLocaleData(localeDa);

export function getTranslateConfig() {
  return {
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  };
}


@NgModule({
  declarations: [
    AppComponent,
    PreviewDataComponent,
    ProgressDialogComponent
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
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'da-DK'
    },
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
      provide  : API_BASE_URL,
      useValue : environment.base
    },
    UserHandlerService,
    {
      provide: APP_INITIALIZER,
      useFactory: (userHandlerService: UserHandlerService) => () => userHandlerService.initialize(),
      deps: [UserHandlerService],
      multi: true
    },
    {
      provide: OBO_USER_MANAGER_TOKEN,
      useValue: new UserManager(environment.oboOidcSettings)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
