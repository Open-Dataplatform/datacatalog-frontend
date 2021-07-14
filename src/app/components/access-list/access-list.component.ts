import {Component, OnInit, Input, Inject} from '@angular/core';
import {DataHandlerService} from "../../shared/data-handler.service";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IDataAccessEntry } from 'src/app/shared/api/api';

@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.less']
})
export class AccessListComponent implements OnInit {

  @Input()
  datasetId: string;
  readers: IDataAccessEntry[] = []; 
  selectedReaders: IDataAccessEntry[]; 
  writers: IDataAccessEntry[] = []; 
  selectedWriters: IDataAccessEntry[]; 

  constructor(
    private readonly dataHandlerService: DataHandlerService,
    private readonly searchDialog: MatDialog)
  {}

  ngOnInit() { 
    this.getAccessList(this.datasetId);
  }

  addReader() {
    this.openSearchDialog()
      .pipe(
        switchMap(res => this.dataHandlerService.addDatasetAccessReader(this.datasetId, res.id)))
      .subscribe(res => {
        if (this.readers.some(x => x.id === res.id)) return;
        this.readers.push(res);
      }, error => { console.log('Failed to add read member: ' + JSON.stringify(error)) }
    );
  }

  removeReader() {
    if (this.selectedReaders)
    {
      this.selectedReaders.forEach(reader => {
        this.dataHandlerService.removeDatasetAccessReader(this.datasetId, reader.id).subscribe(() =>
          {
            this.readers =  this.readers.filter(entry => entry.id != reader.id);
          }, error => { console.log('Failed to get members: ' + JSON.stringify(error)) });
      });
    }
    this.selectedReaders = [];
  }

  addWriter() {
    this.openSearchDialog()
      .pipe(
        switchMap(res => this.dataHandlerService.addDatasetAccessWriter(this.datasetId, res.id)))
      .subscribe(res => {
        if (this.writers.some(x => x.id === res.id)) return;
        this.writers.push(res);
      }, error => { console.log('Failed to add write member: ' + JSON.stringify(error)) }
    );
  }

  removeWriter() {
    if (this.selectedWriters)
    {
      this.selectedWriters.forEach(writer => {
        this.dataHandlerService.removeDatasetAccessWriter(this.datasetId, writer.id).subscribe(() =>
          {
            this.writers =  this.writers.filter(entry => entry.id != writer.id);
          }, error => { console.log('Failed to get members: ' + JSON.stringify(error)) });
      });
    }
    this.selectedWriters = [];
  }

  getAccessList(id: string)
  {
    this.dataHandlerService.getDatasetAccess(id).subscribe(res =>
      {
        this.readers = res.readAccessList;
        this.writers = res.writeAccessList;
      }, error => { console.log('Failed to get members: ' + JSON.stringify(error)) });
  }

  openSearchDialog(): Observable<IAdSearchResult> {
    const dialogRef = this.searchDialog.open(SearchAdDialog, {
      width: '500px',
      height: '400px',
      panelClass: 'search-panel-modal'
    });

    return dialogRef.afterClosed();
  }
}

@Component({
  selector: 'search-dialog',
  templateUrl: 'search-dialog.html',
  styleUrls: ['./search-dialog.less']
})
export class SearchAdDialog {

  searchResults :IAdSearchResult[];
  searchString: string;
  selectedSearchResult: IAdSearchResult;

  constructor(
    public dialogRef: MatDialogRef<SearchAdDialog>,
    private readonly dataHandlerService: DataHandlerService) {}

  search()
  {
    this.dataHandlerService.memberSearch(this.searchString).subscribe(res =>
      {
        this.searchResults = res;
      }, error => { console.log('Failed to get members: ' + JSON.stringify(error)) });
  }
}