import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputElementsModule } from 'src/app/components/input-elements/input-elements.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateCategoryPageRoutingModule } from './create-category-page-routing.module';
import { CreateCategoryPageComponent } from './create-category-page.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [CreateCategoryPageComponent],
    imports: [
        CreateCategoryPageRoutingModule,
        CommonModule,
        SharedModule,
        InputElementsModule,
        NgxMatColorPickerModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    exports: [CreateCategoryPageComponent],
    providers: [
        { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
    ],
})
export class CreateCategoryPageModule { }