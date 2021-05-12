import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataStewardComponent } from './data-steward.component';
import { DataSetComponent } from "./data-set/data-set.component";
import { DataAboutComponent } from "./data-about/data-about.component";
import { DataMetaComponent } from "./data-meta/data-meta.component";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: DataStewardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DataSetComponent,
      },
      {
        path: 'dataset',
        component: DataSetComponent,
      },
      {
        path: 'datameta',
        component: DataMetaComponent,
      },
      {
        path: 'dataabout',
        component: DataAboutComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class DataStewardRoutingModule { }
