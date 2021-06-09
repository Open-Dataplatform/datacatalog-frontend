import {Component, Input, OnInit} from '@angular/core';
import {DataHandlerService} from "../../../shared/data-handler.service";
import { Components } from '../../../../types/dataplatform-api'
import ICategory = Components.Schemas.ICategory;
import IDataset = Components.Schemas.IDataset;
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";

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
  dataCards: IDataset[];
  categories: ICategory[];

  constructor() { }

  ngOnInit() { }

}

