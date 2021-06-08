import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataCardComponent} from "./data-card/data-card.component";
import {CardListComponent} from "./card-list/card-list.component";
import {TagsListComponent} from "../tags-list/tags-list.component";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    DataCardComponent,
    CardListComponent,
    TagsListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    DataCardComponent,
    CardListComponent,
    TagsListComponent,
  ]
})
export class DataCardsModule { }
