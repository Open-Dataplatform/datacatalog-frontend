import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputElementsModule } from 'src/app/components/input-elements/input-elements.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateCategoryPageRoutingModule } from './create-category-page-routing.module';
import { CreateCategoryPageComponent } from './create-category-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerModule } from 'ngx-color-picker';
import { ConfirmationDialogModule } from 'src/app/components/confirmation-dialog/confirmation-dialog.module';

@NgModule({
    declarations: [CreateCategoryPageComponent],
    imports: [
        CreateCategoryPageRoutingModule,
        CommonModule,
        SharedModule,
        InputElementsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        ColorPickerModule,
        ConfirmationDialogModule
    ],
    exports: [CreateCategoryPageComponent],
    providers: [
    ],
})
export class CreateCategoryPageModule { }