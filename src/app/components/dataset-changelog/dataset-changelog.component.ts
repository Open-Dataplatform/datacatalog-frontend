import { Component, Input, OnInit } from '@angular/core';
import { DatasetChangeLog } from 'src/app/shared/api/api';

@Component({
  selector: 'app-dataset-changelog',
  templateUrl: './dataset-changelog.component.html',
  styleUrls: ['./dataset-changelog.component.less']
})
export class DatasetChangelogComponent implements OnInit {

  @Input()
  changelogs: DatasetChangeLog[] | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }
  
}
