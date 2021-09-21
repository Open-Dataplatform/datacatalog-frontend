import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DataField, IDataField } from 'src/app/shared/api/api';
import { DataFieldTypes, DataFieldUnits, EMPTY_GUID } from 'src/app/shared/constants';

@Component({
  selector: 'app-data-field',
  templateUrl: './data-field.component.html',
  styleUrls: ['./data-field.component.less']
})
export class DataFieldComponent implements OnInit {

  @Input() dataFields: IDataField[];
  @Output() dataFieldsChange = new EventEmitter();
  dataTypes = DataFieldTypes;
  dataUnits = DataFieldUnits;

  constructor() { }

  ngOnInit() {
    if (!this.dataFields) {
      this.dataFields = [];
    }
  }

  dataChange() {
    this.dataFieldsChange.emit(this.dataFields);
  }

  addField(): void {
    this.dataFields.push(new DataField({
      id: EMPTY_GUID,
      createdDate: new Date(),
      modifiedDate: new Date()
    }));
    this.dataChange();
  }

  removeField(name: string): void {
    this.dataFields.splice(this.dataFields.findIndex(n => n.name === name), 1);
    this.dataChange();
  }

}
