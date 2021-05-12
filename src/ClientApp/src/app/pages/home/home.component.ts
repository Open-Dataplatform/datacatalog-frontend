import { Component } from '@angular/core';
import { Components } from '../../../types/dataplatform-api'
import ICategory = Components.Schemas.ICategory;
import {DataHandlerService} from "../../shared/data-handler.service";
import { UserHandlerService } from "../../shared/user/user-handler.service";
import { filter, mergeMap } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {

  categories: ICategory[];
  userLoggedIn$ = this.userHandlerService.userLoggedIn$;

  constructor(private dataHandlerService: DataHandlerService, private userHandlerService: UserHandlerService ) { 
    this.userLoggedIn$.pipe(filter(user => user !== null), mergeMap(() => this.dataHandlerService.getCategoryData()))
        .subscribe(categoryData => this.categories = categoryData);
  }
}
