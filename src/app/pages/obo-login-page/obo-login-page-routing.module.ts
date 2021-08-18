import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OboLoginPageComponent } from './obo-login-page.component';

const routes: Routes = [
  {
    path: '',
    component: OboLoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class OboLoginPageRoutingModule { }
