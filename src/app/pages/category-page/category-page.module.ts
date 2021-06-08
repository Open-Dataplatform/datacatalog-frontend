import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryPageComponent} from "./category-page.component";
import {DataCardsModule} from "../../components/data-cards/data-cards.module";
import {SharedModule} from "../../shared/shared.module";
import {CategoryPageRoutingModule} from "./category-page-routing.module";



@NgModule({
  declarations: [
    CategoryPageComponent,
  ],
  imports: [
    CommonModule,
    DataCardsModule,
    SharedModule,
    CategoryPageRoutingModule
  ],
  exports: [
    CategoryPageComponent,
  ]
})
export class CategoryPageModule { }
