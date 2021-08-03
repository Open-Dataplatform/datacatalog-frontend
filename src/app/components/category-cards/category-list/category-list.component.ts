import { Component, OnInit, Input} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";
import { ICategory } from 'src/app/shared/api/api';

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
export class CategoryListComponent implements OnInit {

  @Input()
  categories: ICategory[];

  constructor() { }

  ngOnInit() {
  }
}
