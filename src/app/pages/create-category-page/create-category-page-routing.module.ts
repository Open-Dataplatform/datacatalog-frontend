import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryPageComponent } from './create-category-page.component';

export const routes: Routes = [
    {
        path: '',
        component: CreateCategoryPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class CreateCategoryPageRoutingModule { }