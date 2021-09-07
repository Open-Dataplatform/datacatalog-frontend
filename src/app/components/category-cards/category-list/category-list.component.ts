import { Component, OnInit, Input, OnChanges} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";
import { Category, ICategory } from 'src/app/shared/api/api';
import { EMPTY_GUID } from 'src/app/shared/constants';
import { UserHandlerService } from 'src/app/shared/user/user-handler.service';

const newCategory = new Category({
  id: EMPTY_GUID, 
  name: 'New Category',
  createdDate: new Date(),
  modifiedDate: new Date(),
  originDeleted: false,
  version: 0
});

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger('30ms', [
          animate('300ms ease-in-out', keyframes([
            style({opacity: 0}),
            style({opacity: 1}),
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})
export class CategoryListComponent implements OnChanges {

  @Input()
  categories: ICategory[];
  categoriesWithNew: ICategory[];

  constructor() { }

  ngOnChanges() {

    // Add an additional category which serves as the 'Add new' card
    this.categoriesWithNew = [...this.categories, newCategory];
  }
}
