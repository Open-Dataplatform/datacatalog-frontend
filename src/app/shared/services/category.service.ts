import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ICategory } from '../api/api';
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
        this.userLoggedIn$.pipe(filter(user => user !== null))
        .subscribe(() => this.dataHandlerService.getCategoryData().subscribe(response => { this.categories.next(response); }));
    }

}