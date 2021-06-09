import {Component, Input, OnInit} from '@angular/core';
import { Components } from '../../../types/dataplatform-api'
import ICategory = Components.Schemas.ICategory;

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.less']
})
export class TagsListComponent implements OnInit {

  @Input()
  tags: ICategory[];

  constructor() { }

  ngOnInit() {
  }

}
