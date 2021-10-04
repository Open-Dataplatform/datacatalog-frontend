import {Component, Input, OnInit} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";
import { ICategory, IDatasetSummary } from 'src/app/shared/api/api';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.less'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger('50ms', [
          animate('300ms ease-in-out', keyframes([
            style({opacity: 0}),
            style({opacity: 1}),
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})
export class CardListComponent implements OnInit {

  @Input()
  dataCards: IDatasetSummary[];
  categories: ICategory[];

  constructor() { }

  ngOnInit() { }

}

