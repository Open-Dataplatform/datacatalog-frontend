import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    SharedModule,
  ],
  declarations: [
    TextInputComponent
  ],
  exports: [
    TextInputComponent,
    NgSelectModule,
  ]
})
export class InputElementsModule { }
