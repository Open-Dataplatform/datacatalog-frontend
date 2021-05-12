import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {CategoryCardComponent} from "../../components/category-cards/category-card/category-card.component";
import {CategoryListComponent} from "../../components/category-cards/category-list/category-list.component";
import {SharedModule} from "../../shared/shared.module";
import {DataCardsModule} from "../../components/data-cards/data-cards.module";



@NgModule({
  declarations: [
    HomeComponent,
    CategoryCardComponent,
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    DataCardsModule,
    SharedModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
