import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryPageComponent} from "./category-page.component";

const routes: Routes = [
  {
    path: '',
    component: CategoryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CategoryPageRoutingModule { }
