import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageRoutingModule} from "./login-page-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {LoginPageComponent} from "./login-page.component";
import {InputElementsModule} from "../../components/input-elements/input-elements.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    SharedModule,
    InputElementsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginPageModule { }
