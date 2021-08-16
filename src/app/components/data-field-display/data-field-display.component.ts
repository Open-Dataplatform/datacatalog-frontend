import {Component, Input, OnInit} from '@angular/core';
import { IDataField } from 'src/app/shared/api/api';

@Component({
  selector: 'app-data-field-display',
  templateUrl: './data-field-display.component.html',
  styleUrls: ['./data-field-display.component.less']
})
export class DataFieldDisplayComponent implements OnInit {

  @Input()
  dataFields: IDataField[];

  constructor() { }

  ngOnInit() {
  }

}
