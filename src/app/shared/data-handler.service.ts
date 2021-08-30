import { Injectable } from '@angular/core';
import { HttpErrorResponse} from "@angular/common/http";
import {EMPTY, Observable, throwError} from "rxjs";
import { filter } from "rxjs/operators";

import { UserHandlerService } from "../shared/user/user-handler.service";
import { AddDatasetAccessMemberRequestDto, CategoryClient, DatasetAccessClient, DatasetClient, DatasetSearchByCategoryRequest, DatasetSearchByTermRequest, IAdSearchResult, ICategory, IDataAccessEntry, IDatasetAccessList, IDataset, IDatasetSummary, ILineageTransformation, ILineageDataset, GeneralClient, IEnum, DurationClient, IDuration, HierarchyClient, IHierarchy, DataSourceClient, IDataSource, IDatasetLocationRequest, DatasetLocationRequest, IDatasetLocation, TransformationClient, IGuidId, ITransformation, GuidId, MemberGroupClient, IMemberGroup, Dataset, DatasetCreateRequest, IDatasetCreateRequest, IDatasetUpdateRequest, DatasetUpdateRequest, ApiException } from './api/api';

/*
This is a service that handles the connection to the api,
most of call to the api can be subscribe to through this service,
This will then handle error and log them if the backend sends an error.
 */

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  currentTransformation?: ILineageTransformation;
  userLoggedIn$ = this.userHandlerService.userLoggedIn$;

  constructor(
    private readonly userHandlerService: UserHandlerService,
    private readonly categoryClient: CategoryClient,
    private readonly datasetClient: DatasetClient,
    private readonly datasetAccessClient: DatasetAccessClient,
    private readonly generalClient: GeneralClient,
    private readonly durationClient: DurationClient,
    private readonly hierarchyClient: HierarchyClient,
    private readonly dataSourceClient: DataSourceClient,
    private readonly transformationClient: TransformationClient,
    private readonly memberGroupClient: MemberGroupClient,
  ) { }

  public getCategoryData(includeEmpty :boolean = false): Observable<ICategory[]> {
    return this.categoryClient.getAll(includeEmpty);
  }

  public getDataSets(term: string, pageSize?: number, pageIndex?: number): Observable<IDatasetSummary[]> {
    return this.datasetClient.getBySearchTerm(new DatasetSearchByTermRequest(
      {
        sortType: 0,
        searchTerm: term,
        pageSize: pageSize,
        pageIndex: pageIndex,
        take: 0
      }
    ));
  }

  public getCategorySets(categoryId: string, pageSize?: number, pageIndex?: number): Observable<IDatasetSummary[]> {
      return this.datasetClient.getByCategory(new DatasetSearchByCategoryRequest(
        {
          sortType: 0,
          categoryId: categoryId,
          pageSize: pageSize,
          pageIndex: pageIndex,
          take: 0
        }
      ));
  }

  public getSearchSuggestions(term): Observable<IDataset[]> {
    return this.datasetClient.getNameBySearchTerm(new DatasetSearchByTermRequest(
      {
        take: 5,
        sortType: 0,
        searchTerm: term,
        pageIndex: 0,
        pageSize: 0
      }
    ));
  }

  public getDetailsFromId(id: string): Observable<IDataset> {
    return this.datasetClient.findById(id);
  }

  public getDatasetAccess(id: string): Observable<IDatasetAccessList> {
    return this.datasetAccessClient.getAccessList(id);
  }

  public removeDatasetAccessReader(datasetId: string, memberId: string): Observable<any>
  {

    return this.datasetAccessClient.removeReadDataAccessMember(datasetId, memberId);
  }

  public removeDatasetAccessWriter(datasetId: string, memberId: string): Observable<any>
  {
    return this.datasetAccessClient.removeWriteDataAccessMember(datasetId, memberId);
  }

  public memberSearch(searchString: string): Observable<IAdSearchResult[]>
  {
    return this.datasetAccessClient.search(searchString);
  }

  public addDatasetAccessReader(datasetId: string, memberId: string): Observable<IDataAccessEntry>
  {
    const accessMemberDto = { memberId: memberId } as AddDatasetAccessMemberRequestDto;
    return this.datasetAccessClient.addReadAccessMember(datasetId, accessMemberDto);
  }

  public addDatasetAccessWriter(datasetId: string, memberId: string): Observable<IDataAccessEntry>
  {
    const accessMemberDto = { memberId: memberId } as AddDatasetAccessMemberRequestDto;
    return this.datasetAccessClient.addWriteAccessMember(datasetId, accessMemberDto);
  }

  public getLineage(id: string): Observable<ILineageDataset> {
    return this.datasetClient.getLineage(id);
  }

  public getConfidentiality(): Observable<IEnum[]> {
    return this.generalClient.getConfidentialities();
  }

  public getDurations(): Observable<IDuration[]> {
    return this.durationClient.getAll();
  }

  public getRefinementLevel(): Observable<IEnum[]> {
    return this.generalClient.getRefinementLevels();
  }

  public getHierarchies(): Observable<IHierarchy[]> {
    return this.hierarchyClient.getAll();
  }

  public getDataSources(): Observable<IDataSource[]> {
    return this.dataSourceClient.getAll();
  }

  public getLocation(locationRequest: IDatasetLocationRequest): Observable<IDatasetLocation> {
    return this.datasetClient.getDatasetLocation(locationRequest as DatasetLocationRequest);
  }

  public getTransformations(ids: IGuidId[]): Observable<ITransformation[]> {
    return this.transformationClient.getByDatasets(ids as GuidId[]);
  }

  public getMemberGroups(): Observable<IMemberGroup[]> {
    return this.memberGroupClient.getAll();
  }

  public getDataSetStatus(): Observable<IEnum[]> {
    return this.generalClient.getDatasetStatusValues();
  }

  public createNewDataSet(dataSet: IDatasetCreateRequest): Observable<IDataset> {
    if (!dataSet) {
      this.handleError('please fill out data');
      return EMPTY;
    }

    return this.datasetClient.post(new DatasetCreateRequest(dataSet))
  }

  public updateDataSet(dataSet: IDatasetUpdateRequest): Observable<IDataset> {
    if (!dataSet) {
      this.handleError('please fill out data');
      return EMPTY;
    }

    return this.datasetClient.put(new DatasetUpdateRequest(dataSet));
  }

  public setCurrentTransformation(transform: ILineageTransformation[]) {
    this.currentTransformation = transform && transform.length ? transform[0]: undefined;
  }

  public handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
