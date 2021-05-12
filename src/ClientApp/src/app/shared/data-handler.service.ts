import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {EMPTY, Observable, throwError} from "rxjs";
import { filter } from "rxjs/operators";
import {environment} from "../../environments/environment";

import { IConfidentialityEnum } from "../../types/dataplatform-enum";
import { Components } from '../../types/dataplatform-api'
import ICategory = Components.Schemas.ICategory;
import IDataset = Components.Schemas.IDataset;
import ITransformation = Components.Schemas.ITransformation;
import IMemberGroup = Components.Schemas.IMemberGroup;
import IDatasetStatus = Components.Schemas.IDatasetStatus;
import IRefinementLevel = Components.Schemas.IRefinementLevel;
import IHierarchy = Components.Schemas.IHierarchy;
import IDatasetLocationRequest = Components.Schemas.IDatasetLocationRequest;
import IDatasetLocation = Components.Schemas.IDatasetLocation;
import ILineageDataset = Components.Schemas.ILineageDataset;
import IDataSource = Components.Schemas.IDataSource;
import {TranslateService} from "@ngx-translate/core";
import IDuration = Components.Schemas.IDuration;
import IDatasetAccessList = Components.Schemas.IDatasetAccessList;
import IDatasetGroup = Components.Schemas.IDatasetGroup;
import IAdSearchResultResponse = Components.Schemas.IAdSearchResultResponse;
import IDataAccessEntry = Components.Schemas.IDataAccessEntry;
import { UserHandlerService } from "../shared/user/user-handler.service";

/*
This is a service that handles the connection to the api,
most of call to the api can be subscribe to through this service,
This will then handle error and log them if the backend sends an error.
 */

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  categories: ICategory[];
  currentTransformation?: ITransformation;
  userLoggedIn$ = this.userHandlerService.userLoggedIn$;

  constructor(private readonly http:HttpClient,
              private readonly translate: TranslateService,
              private readonly userHandlerService: UserHandlerService) {
      this.userLoggedIn$.pipe(filter(user => user !== null))
        .subscribe(() => this.getCategoryData().subscribe(response => { this.categories = response; }));
  }

  get urlBase(): string {
    return environment.base;
  }

  public getCategoryData(includeEmpty :boolean = false): Observable<ICategory[]> {
    const url = `${this.urlBase}/api/category?includeEmpty=${includeEmpty}`;
    return this.http
      .get<ICategory[]>(url);
  }

  public getDataSets(term: string, pageSize?: number, pageIndex?: number): Observable<IDataset[]> {
    const url = `${this.urlBase}/api/dataset/search/term`;
    return this.http
      .post<IDataset[]>(url, {
        "sortType": 0,
        "searchTerm": term,
        "pageSize": pageSize,
        "pageIndex": pageIndex
      });
  }

  public getCategorySets(term: string, pageSize?: number, pageIndex?: number): Observable<IDataset[]> {
    const url = `${this.urlBase}/api/dataset/search/category`;
    return this.http
      .post<IDataset[]>(url, {
        "sortType": 0,
        "categoryId": term,
        "pageSize": pageSize,
        "pageIndex": pageIndex
      });
  }

  public getSearchSuggestions(term): Observable<IDataset[]> {
    const url = `${this.urlBase}/api/dataset/search/predictive`;
    return this.http
      .post<IDataset[]>(url, {
        "take": 5,
        "sortType": 0,
        "searchTerm": term
      });
  }

  public getDetailsFromId(id: string): Observable<IDataset> {
    const url = `${this.urlBase}/api/dataset/${id}`;
    return this.http
      .get<IDataset>(url);
  }

  public getDatasetAccess(id: string): Observable<IDatasetAccessList> {
    const url = `${this.urlBase}/api/dataset/${id}/access`;
    return this.http
      .get<IDatasetAccessList>(url);
  }

  public removeDatasetAccessReader(datasetId: string, memberId: string): Observable<any>
  {
    const url = `${this.urlBase}/api/dataset/${datasetId}/access/${memberId}/read`;
    return this.http.delete(url);
  }

  public removeDatasetAccessWriter(datasetId: string, memberId: string): Observable<any>
  {
    const url = `${this.urlBase}/api/dataset/${datasetId}/access/${memberId}/write`;
    return this.http.delete(url);
  }

  public memberSearch(searchString: string): Observable<IAdSearchResultResponse[]>
  {
    const url = `${this.urlBase}/api/dataset/access?search=${searchString}`;
    return this.http.get<IAdSearchResultResponse[]>(url);
  }

  public addDatasetAccessReader(datasetId: string, memberId: string): Observable<IDataAccessEntry>
  {
    const url = `${this.urlBase}/api/dataset/${datasetId}/access/read`;
    return this.http.post<IDataAccessEntry>(url, {
      MemberId: memberId
    });
  }

  public addDatasetAccessWriter(datasetId: string, memberId: string): Observable<IDataAccessEntry>
  {
    const url = `${this.urlBase}/api/dataset/${datasetId}/access/write`;
    return this.http.post<IDataAccessEntry>(url, {
      MemberId: memberId
    });
  }

  public getLineage(id: string): Observable<ILineageDataset> {
    const url = `${this.urlBase}/api/dataset/lineage/${id}`;
    return this.http
      .get<ILineageDataset>(url);
  }

  public getSimpleLineage(id: string): Observable<ITransformation> {
    const url = `${this.urlBase}/api/dataset/lineage/simple/${id}`;
    return this.http
      .get<ITransformation>(url);
  }

  public getStarred(): Observable<any> {
    const url = `${this.urlBase}/api/datasetgroup/`;
    return this.http
      .get(url);
  }

  public updateStarredGroup(dataSets: {id: string}[]): Observable<IDatasetGroup[]> {
    const url = `${this.urlBase}/api/datasetgroup/`;
    return this.http
      .put<IDatasetGroup[]>(url, {
        name: "Starred",
        description: "Starred datasets",
        datasets: dataSets
      });
  }

  public createStarredGroup(dataSets: {id: string}[]): Observable<IDatasetGroup[]> {
    const url = `${this.urlBase}/api/datasetgroup/`;
    console.log('newpost', {
      name: "Starred",
      description: "Starred datasets",
      datasets: dataSets
    });
    return this.http
      .post<IDatasetGroup[]>(url, {
        name: "Starred",
        description: "Starred datasets",
        datasets: dataSets
      });
  }

  public getConfidentiality(): Observable<IConfidentialityEnum[]> {
    const url = `${this.urlBase}/api/general/confidentiality`;
    return this.http
      .get<IConfidentialityEnum[]>(url);
  }

  public getDurations(): Observable<IDuration[]> {
    const url = `${this.urlBase}/api/general/duration`;
    return this.http
      .get<IDuration[]>(url);
  }

  public getRefinementLevel(): Observable<IRefinementLevel[]> {
    const url = `${this.urlBase}/api/general/refinementlevel`;
    return this.http
      .get<IRefinementLevel[]>(url);
  }

  public getHierarchies(): Observable<IHierarchy[]> {
    const url = `${this.urlBase}/api/general/hierarchies`;
    return this.http
      .get<IHierarchy[]>(url);
  }

  public getDataSources(): Observable<IDataSource[]> {
    const url = `${this.urlBase}/api/datasource`;
    return this.http
      .get<IDataSource[]>(url);
  }

  public getLocation(locationRequest: IDatasetLocationRequest): Observable<IDatasetLocation> {
    const url = `${this.urlBase}/api/dataset/location`;
    return this.http
      .post<IDatasetLocation>(url, locationRequest);
  }

  public getTransformations(ids: ITransformation[]): Observable<ITransformation[]> {
    const url = `${this.urlBase}/api/transformation/getbydatasets`;
    return this.http
      .post<ITransformation[]>(url, ids);
  }

  public getMemberGroups(): Observable<IMemberGroup[]> {
    const url = `${this.urlBase}/api/membergroup`;
    return this.http
      .get<IMemberGroup[]>(url);
  }

  public getDataSetStatus(): Observable<IDatasetStatus[]> {
    const url = `${this.urlBase}/api/general/datasetstatus`;
    return this.http
      .get<IDatasetStatus[]>(url);
  }

  public createNewDataSet(dataSet: IDataset): Observable<IDataset> {
    if (!dataSet) {
      this.handleError('please fill out data');
      return EMPTY;
    }
    const url = `${this.urlBase}/api/dataset`;
    return this.http.post(url, dataSet);
  }

  public updateDataSet(dataSet: IDataset): Observable<IDataset> {
    if (!dataSet) {
      this.handleError('please fill out data');
      return EMPTY;
    }
    const url = `${this.urlBase}/api/dataset`;
    return this.http.put(url, dataSet);
  }

  public setCurrentTransformation(transform: ITransformation[]) {
    this.currentTransformation = transform && transform.length ? transform[0]: undefined;
  }

  public handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
