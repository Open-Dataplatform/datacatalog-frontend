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
import { UserManager } from 'oidc-client';
import { environment } from "../../environments/environment";

@NgModule({
  declarations: [
    AutosizeDirective,
    PageNotFoundComponent,
    LoadingComponent,
    InfiniteScrollComponent,
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
  ],
  providers: [
    {
      provide : UserManager,
      useValue: new UserManager(environment.oidcSettings)
    }
  ]
})
export class SharedModule { }
