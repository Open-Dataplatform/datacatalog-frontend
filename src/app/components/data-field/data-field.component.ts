import { CdkDragDrop } from '@angular/cdk/drag-drop';
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
  dataTypes: string[];
  dataUnits = DataFieldUnits;

  constructor() { }

  ngOnInit() {
    if (!this.dataFields) {
      this.dataFields = [];
      this.dataTypes = DataFieldTypes;
    } else {
      // Merge DataFieldTypes with the types on existing dataFields. 
      // We do this because we need to handle datasets created before we started to enforce which types could be chosen
      this.dataTypes = [...new Set([...DataFieldTypes, ...this.dataFields.map(df => df.type)])]
    }
  }

  dataChange() {
    this.dataFieldsChange.emit(this.dataFields);
  }

  addField(): void {
    this.dataFields.push(new DataField({
      id: EMPTY_GUID,
    }));
    this.dataChange();
  }

  removeField(name: string): void {
    this.dataFields.splice(this.dataFields.findIndex(n => n.name === name), 1);
    this.dataChange();
  }

  drop(event: CdkDragDrop<string[]>) {
    this.moveItemInArray(this.dataFields, event.previousIndex, event.currentIndex);
    this.dataChange();
  }

  moveItemInArray(array, previousIndex, newIndex) {
    array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  }

}
