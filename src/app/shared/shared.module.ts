import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ModalModule } from "./modal";
import { TranslateModule } from "@ngx-translate/core";
import { AutosizeDirective } from './autosize/autosize.directive';
import { PageNotFoundComponent } from "../pages/page-not-found/page-not-found.component";
import { RouterModule } from "@angular/router";
import { LoadingComponent } from './loading/loading.component';
import {InfiniteScrollComponent} from './infinity-scroll/infinity-scroll.component';
import { UserManager, WebStorageStateStore } from 'oidc-client';
import { environment } from "../../environments/environment";
import { FormWrapper } from './form-wrapper/form-wrapper.component';

@NgModule({
  declarations: [
    AutosizeDirective,
    PageNotFoundComponent,
    LoadingComponent,
    InfiniteScrollComponent,
    FormWrapper,
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    FormsModule,
    ModalModule,
    TranslateModule,
    AutosizeDirective,
    PageNotFoundComponent,
    RouterModule,
    LoadingComponent,
    InfiniteScrollComponent,
    FormWrapper,
  ],
  providers: [
    {
      provide : UserManager,
      useValue: new UserManager({...environment.oidcSettings, userStore: new WebStorageStateStore({ store: window.localStorage }) })
    }
  ]
})
export class SharedModule { }
