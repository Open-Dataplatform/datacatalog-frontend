import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IDataField } from 'src/app/shared/api/api';

@Component({
  selector: 'app-data-field',
  templateUrl: './data-field.component.html',
  styleUrls: ['./data-field.component.less']
})
export class DataFieldComponent implements OnInit {

  @Input() dataFields: IDataField[];
  @Output() dataFieldsChange = new EventEmitter();

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
    this.dataFields.push({
      id: "",
      name: "New field",
      type: "",
      description: "",
      format: "",
      validation: "",
      modifiedDate: new Date(),
      createdDate: new Date()
    });
    this.dataChange();
  }

  removeField(name: string): void {
    this.dataFields.splice(this.dataFields.findIndex(n => n.name === name), 1);
    this.dataChange();
  }

}
