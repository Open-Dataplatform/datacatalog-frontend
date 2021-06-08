import {Component, Input, OnInit} from '@angular/core';
import { Components } from '../../../types/dataplatform-api'
import IDataField = Components.Schemas.IDataField;

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
