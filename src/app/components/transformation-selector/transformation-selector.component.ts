import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {DataStewardHandlerService} from "../../pages/data-steward/data-steward-handler.service";
import {Observable} from "rxjs";
import {DataHandlerService} from "../../shared/data-handler.service";
import {NgSelectComponent} from "@ng-select/ng-select";
import { GuidId, IDatasetSummary, ITransformation, Transformation } from 'src/app/shared/api/api';

@Component({
  selector: 'app-transformation-selector',
  templateUrl: './transformation-selector.component.html',
  styleUrls: ['./transformation-selector.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TransformationSelectorComponent implements OnInit {

  @Input() dataSetTransformation: ITransformation;
  @Output() dataSetTransformationChange = new EventEmitter();

  dataset$: Observable<IDatasetSummary[]>;
  transformations: ITransformation[];
  activeTransformation: ITransformation;

  addNew: boolean;

  constructor(private readonly dataStewardHandlerService: DataStewardHandlerService,
              private readonly dataHandlerService: DataHandlerService) { }

  ngOnInit() {
    this.dataset$ = this.dataHandlerService.getDataSets('');
    if (!this.dataSetTransformation) {
      this.dataSetTransformation = new Transformation();
    } else {
      this.onDataChange();
      this.activeTransformation = Object.assign({}, this.dataSetTransformation);
    }
  }

  onDataChange() {
    const sourceDatasetIds = this.dataSetTransformation.sourceDatasets?.map(foo => new GuidId({ id: foo.id }));
    this.dataHandlerService.getTransformations(sourceDatasetIds).subscribe(response => {
      this.transformations = response;
      if (this.showCreateNew() && this.dataSetTransformation && this.dataSetTransformation.id) {
        this.clearTransformation();
        this.emitData();
      }
    });
    this.emitData();
  }

  changeTransformations(newTransformation: boolean = false) {
    if (newTransformation) {
      this.emitData();
      return;
    }

    if (this.activeTransformation && this.activeTransformation.sourceDatasets) {
      delete this.activeTransformation.sourceDatasets;
    }

    this.dataSetTransformation = Object.assign(this.dataSetTransformation, this.activeTransformation);
    this.emitData();
  }

  // Emit data to parent
  emitData(): void {
    this.dataSetTransformationChange.emit(this.dataSetTransformation);
  }

  // Hide the add transformation.
  removeAddNew() {
    this.addNew = false;
  }

  // Show add transformation while transformation is present.
  addNewTransformation(select: NgSelectComponent) {
    this.clearTransformation();
    this.addNew = true;
    select.close();
  }

  // Clear current transformation
  clearTransformation() {
    this.activeTransformation = new Transformation();
    const tempSourceDataSets = this.dataSetTransformation.sourceDatasets;
    this.dataSetTransformation = new Transformation();
    this.dataSetTransformation.sourceDatasets = tempSourceDataSets;
    this.emitData();
  }

  showTransformationSelector(): boolean {
    return  this.transformations &&
      this.transformations.length &&
      this.dataSetTransformation &&
      this.dataSetTransformation.sourceDatasets &&
      this.dataSetTransformation.sourceDatasets.length > 0;
  }

  showCreateNew(): boolean {
    return this.transformations &&
      !this.transformations.length &&
      this.dataSetTransformation &&
      this.dataSetTransformation.sourceDatasets &&
      this.dataSetTransformation.sourceDatasets.length > 0 ||
      this.addNew;
  }

}
