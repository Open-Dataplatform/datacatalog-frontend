import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OboLoginPageRoutingModule} from './obo-login-page-routing.module';
import {OboLoginPageComponent} from './obo-login-page.component';

@NgModule({
  declarations: [
    OboLoginPageComponent,
  ],
  imports: [
    CommonModule,
    OboLoginPageRoutingModule,
  ],
  exports: [
    OboLoginPageComponent
  ]
})
export class OboLoginPageModule { }
