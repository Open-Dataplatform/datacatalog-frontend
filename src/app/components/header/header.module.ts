import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header.component";
import { SearchComponent } from "./search/search.component";
import { SharedModule } from "../../shared/shared.module";
import { InputElementsModule } from "../input-elements/input-elements.module";
import { MessageNotifierComponent } from "../../shared/message-notifier/message-notifier.component";



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InputElementsModule
  ],
  declarations: [
    HeaderComponent,
    SearchComponent,
    MessageNotifierComponent
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { }
