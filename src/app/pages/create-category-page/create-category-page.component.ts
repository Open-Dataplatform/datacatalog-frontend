import { Color } from '@angular-material-components/color-picker';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CategoryUpdateRequest, ICategory } from 'src/app/shared/api/api';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
    selector: 'create-category-page',
    templateUrl: './create-category-page.component.html',
    styleUrls: ['./create-category-page.component.less']
})

export class CreateCategoryPageComponent implements OnInit {
    category: ICategory;
    colorCtr: AbstractControl = new FormControl(null, [Validators.required]);
    color: ThemePalette = 'primary';

    constructor(
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.category = this.categoryService.getCategoryForEditing();
    }

    onDataChange() {
    }

    publishCategory() {
        debugger;
        this.category.colour = `#${this.colorCtr.value?.hex}`;
        this.categoryService.upsertCategory(this.category);
    }

    isDataValid(): boolean {
        return !this.colorCtr.invalid && this.category.name !== undefined && this.category.name !== '';
    }
}