import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Category, ICategory, ICategoryUpdateRequest } from '../api/api';
import { DataHandlerService } from '../data-handler.service';
import { UserHandlerService } from '../user/user-handler.service';

@Injectable({providedIn: 'root'})
export class CategoryService {
    private categories = new BehaviorSubject<ICategory[]>([]);
    public categories$ = this.categories.asObservable();

    private userLoggedIn$ = this.userHandlerService.userLoggedIn$;

    private category: ICategory;

    constructor(
        private readonly userHandlerService: UserHandlerService,
        private readonly dataHandlerService: DataHandlerService

    ) {
        this.userLoggedIn$.pipe(filter(user => user !== null)).subscribe(() => {
            this.dataHandlerService.getCategoryData().subscribe(response => {
                this.categories.next(response);
            });
        });
    }

    getCategoryForEditing() {
        if (this.category) {
            return this.category;
        }

        return new Category();
    }

    setCategoryForEditing(category: ICategory) {
        this.category = category;
    }

    upsertCategory(category: ICategoryUpdateRequest) {
        if (category.id !== undefined) { // Update
            this.dataHandlerService.updateCategory(category).subscribe(response => {
                const oldCategories = this.categories.getValue();
                const indexOfUpdatedCategory = oldCategories.findIndex(x => x.id == category.id);
                
                // Replace the updated category in the list of categories
                oldCategories.splice(indexOfUpdatedCategory, 1, response);
                
                // Update Subject with new category list
                this.categories.next(oldCategories);
            })
        } else { // Insert
            this.dataHandlerService.createCategory(category).subscribe(response => {
                // Push new category to categories and update subject
                this.categories.next([...this.categories.getValue(), response]);
            });
        }
    }
}