import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-preview-data',
  templateUrl: './preview-data.component.html',
  styleUrls: ['./preview-data.component.less']
})
export class PreviewDataComponent implements OnInit {

  public displayedColumns: string[];
  public rows: [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: PreviewDataDialogData,
              public dialogRef: MatDialogRef<PreviewDataComponent>) {
    this.displayedColumns = data.displayedColumns;
    this.rows = data.rows;
  }

  ngOnInit() {
    this.dialogRef.updateSize('100%', '90%');
  }

}

export class PreviewDataDialogData {
  public displayedColumns: string[];
  public rows: [];

  constructor(displayedColumns: string[], rows: []) {
    this.displayedColumns = displayedColumns;
    this.rows = rows;
  }
}
