import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ICategory, ICategoryUpdateRequest } from '../api/api';
import { EMPTY_GUID } from '../constants';
import { DataHandlerService } from '../data-handler.service';
import { UserHandlerService } from '../user/user-handler.service';

@Injectable({providedIn: 'root'})
export class CategoryService {
    private categories = new BehaviorSubject<ICategory[]>([]);
    public categories$ = this.categories.asObservable();

    private userLoggedIn$ = this.userHandlerService.userLoggedIn$;
    private hasDataStewardAccess: boolean;

    constructor(
        private readonly userHandlerService: UserHandlerService,
        private readonly dataHandlerService: DataHandlerService

    ) {
        this.userHandlerService.userHasDataStewardRole$.subscribe(x => this.hasDataStewardAccess = x);
        
        this.userLoggedIn$.pipe(filter(user => user !== null)).subscribe(() => {
            this.dataHandlerService.getCategoryData(this.hasDataStewardAccess).subscribe(response => {
                this.categories.next(response);
            });
        });
    }

    upsertCategory(category: ICategoryUpdateRequest): Observable<ICategory> {
        let result$: Observable<ICategory>;

        if (category.id !== undefined && category.id !== EMPTY_GUID) { // Update
            result$ = this.dataHandlerService.updateCategory(category);
            result$.subscribe(response => {
                const oldCategories = this.categories.getValue();
                const indexOfUpdatedCategory = oldCategories.findIndex(x => x.id == category.id);
                
                // Replace the updated category in the list of categories
                oldCategories.splice(indexOfUpdatedCategory, 1, response);
                
                // Update Subject with new category list
                this.categories.next(oldCategories);
            });
        } else { // Insert
            result$ = this.dataHandlerService.createCategory(category);

            result$.subscribe(response => {
                this.categories.next([...this.categories.getValue(), response])
            });
        }
        return result$;
    }
}