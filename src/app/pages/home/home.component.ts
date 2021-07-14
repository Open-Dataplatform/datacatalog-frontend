import { Component } from '@angular/core';
import {DataHandlerService} from "../../shared/data-handler.service";
import { UserHandlerService } from "../../shared/user/user-handler.service";
import { filter, mergeMap } from "rxjs/operators";
import { ICategoryResponse } from 'src/app/shared/api/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {

  categories: ICategoryResponse[];
  userLoggedIn$ = this.userHandlerService.userLoggedIn$;

  constructor(private dataHandlerService: DataHandlerService, private userHandlerService: UserHandlerService ) { 
    this.userLoggedIn$.pipe(filter(user => user !== null), mergeMap(() => this.dataHandlerService.getCategoryData()))
        .subscribe(categoryData => this.categories = categoryData);
  }
}
