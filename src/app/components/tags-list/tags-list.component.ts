import {Component, Input, OnInit} from '@angular/core';
import { ICategory } from 'src/app/shared/api/api';

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
