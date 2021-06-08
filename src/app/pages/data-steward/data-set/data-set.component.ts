import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from "../../../shared/data-handler.service";
import {DataStewardHandlerService} from "../data-steward-handler.service";
import { Components } from '../../../../types/dataplatform-api'
import IDataset = Components.Schemas.IDataset;
import {Observable} from "rxjs";
import IDatasetStatus = Components.Schemas.IDatasetStatus;
import IRefinementLevel = Components.Schemas.IRefinementLevel;
import IHierarchy = Components.Schemas.IHierarchy;
import IDatasetLocationRequest = Components.Schemas.IDatasetLocationRequest;
import IDataSource = Components.Schemas.IDataSource;
import {Router} from "@angular/router";

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.less']
})
export class DataSetComponent implements OnInit {

  data: IDataset;
  status$: Observable<IDatasetStatus[]>;
  refinementLevel$: Observable<IRefinementLevel[]>;
  hierarchies$: Observable<IHierarchy[]>;
  dataSource$: Observable<IDataSource[]>;
  hierarchies: IHierarchy[];
  generatedLocation: string;

  constructor(private readonly dataHandlerService: DataHandlerService,
              private readonly dataStewardHandlerService: DataStewardHandlerService,
              private readonly router: Router) { }

  ngOnInit() {
    this.data = this.dataStewardHandlerService.getDataSet();
    this.data.status = 0;
    this.data.hierarchy = this.data.hierarchy ? this.data.hierarchy : {};

    this.status$ = this.dataHandlerService.getDataSetStatus();
    this.refinementLevel$ = this.dataHandlerService.getRefinementLevel();
    this.hierarchies$ = this.dataHandlerService.getHierarchies();
    this.dataSource$ = this.dataHandlerService.getDataSources();

    this.hierarchies$.subscribe(hierarcy => {
      this.hierarchies = hierarcy;
    });
  }

  // update data on service when changed.
  onDataChange() {
    this.dataStewardHandlerService.setDataSet(this.data);

    if (this.isDataReadyForLocationRequest()) {
      this.getDataLocation();
    }
  }

  // Get the location of the data set
  getDataLocation() {
    const locationRequest: IDatasetLocationRequest = {
      name: this.data.name,
      hierarchy: {id: this.data.hierarchy.id},
    };
    this.dataHandlerService.getLocation(locationRequest).subscribe(location => {
      this.generatedLocation = location.location;
    });
  }

  selectedChildHierarchy(parentId: string): IHierarchy[] {
    if (!this.hierarchies) {
      return;
    }
    const result = this.hierarchies.filter(parent => {
      return parent.id === parentId
    })[0];
    return result.childHierarchies;
  }

  // Check if the data is ready to get location.
  isDataReadyForLocationRequest(): boolean {
    return this.data.name &&
      this.data.hierarchy &&
      this.data.hierarchy.id &&
      this.data.hierarchy.id.length > 0;
  }

  nextPage() {
    this.router.navigate(['/datasteward/datameta']);
  }
}
