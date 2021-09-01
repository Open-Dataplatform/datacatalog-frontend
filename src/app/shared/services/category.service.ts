import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Category, ICategory, ICategoryUpdateRequest } from '../api/api';
import { EMPTY_GUID } from '../constants';
import { DataHandlerService } from '../data-handler.service';
import { UserHandlerService } from '../user/user-handler.service';

@Injectable({providedIn: 'root'})
export class CategoryService {
    private categories = new BehaviorSubject<ICategory[]>([]);
    public categories$ = this.categories.asObservable();

    private userLoggedIn$ = this.userHandlerService.userLoggedIn$;

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

    getCategoryById(id: string): ICategory {

        const category = this.categories.getValue().find(cat => cat.id === id);
        
        if (category !== undefined) {
            return category;
        }

        return new Category();
    }

    upsertCategory(category: ICategoryUpdateRequest): Observable<ICategory> {

        if (category.id !== undefined && category.id !== EMPTY_GUID) { // Update
            const category$ = this.dataHandlerService.updateCategory(category);
            category$.subscribe(response => {
                const oldCategories = this.categories.getValue();
                const indexOfUpdatedCategory = oldCategories.findIndex(x => x.id == category.id);
                
                // Replace the updated category in the list of categories
                oldCategories.splice(indexOfUpdatedCategory, 1, response);
                
                // Update Subject with new category list
                this.categories.next(oldCategories);
            });

            return category$;
        } else { // Insert
            return this.dataHandlerService.createCategory(category);
        }
    }
}