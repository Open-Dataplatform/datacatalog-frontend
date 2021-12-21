import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';
import { DetailsPageComponent } from './details-page.component';
import {SharedModule} from "../../shared/shared.module";
import { Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {DetailsPageRoutingModule} from "./details-page-routing.module";
import {DataCardsModule} from "../../components/data-cards/data-cards.module";
import {RelationMapperComponent} from "../../components/relation-mapper/relation-mapper.component";
import {DataFieldDisplayComponent} from "../../components/data-field-display/data-field-display.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import { Components } from '../../../types/dataplatform-api'
import IDataset = Components.Schemas.IDataset;
import { DataStewardHandlerService } from "../data-steward/data-steward-handler.service";

const mockDataset: IDataset = {
  name: "mock dataset name",
  description: "mock dataset name description",
  status: 0,
  confidentiality: 0,
  refinementLevel: 0,
  location: "here/there/mock-dataset-name",
  contact: {id: "12345" },
  frequency: {id: "1234", code: "45565", description: "frequency description"},
  resolution: {id: "6547", code: "45565", description: "resolution description"},
  sourceTransformation: {},
  dataFields: [
    {name: "Field1", type: "string", format: "utf8", description: "field1 description", validation: "field1 validation", id: "1234" },,
    {name: "Field1", type: "int", format: "int", description: "field2 description", validation: "field2 validation", id: "32415" },
    {name: "Field1", type: "long", format: "long", description: "field3 description", validation: "field3 validation", id: "45654" }],
  categories: [{name: "categori1", colour: "blue", imageUri: "123213123", version: 4, id: "sdasd"}],
  datasetChangeLogs: [{member: {name: "test name", id: "asdad"}}],
  dataSources: [{name: "dmi", id: "1234"}],
  version: 3,
  id: "231212"
}

describe('DetailsPageComponent', () => {
  let sut: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        DetailsPageRoutingModule,
        DataCardsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [ DetailsPageComponent, RelationMapperComponent, DataFieldDisplayComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPageComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should sorrectly promote raw dataset to stock', inject([DataStewardHandlerService], (dataStewardHandlerServiceMock: DataStewardHandlerService) => {
    // Arrange
    sut.dataSet = mockDataset;
    const mockDatasetName = sut.dataSet.name;
    const mockDatasetId = sut.dataSet.id;
    const promotedDatasetName = 'promoted_' + mockDatasetName;
    const location = sut.dataSet.location;
    const currentLocation = mockDatasetName.toLocaleLowerCase().replace(' ', '-');
    const newLocation = promotedDatasetName.toLocaleLowerCase().replace(' ', '-');

    // Act 
    sut.promoteDatasetToStock();

    // Assert
    expect(dataStewardHandlerServiceMock.dataSet.sourceTransformation.sourceDatasets).toContain(
      {
        name: mockDatasetName,
        description: mockDataset.description,
        status: mockDataset.status,
        confidentiality: mockDataset.confidentiality,
        categories: mockDataset.categories,
        id: mockDatasetId,
        createdDate: mockDataset.createdDate,
        modifiedDate: mockDataset.modifiedDate
      });
    expect(dataStewardHandlerServiceMock.dataSet.description).toBe(mockDataset.description);
    expect(dataStewardHandlerServiceMock.dataSet.id).toBeNull();
    expect(dataStewardHandlerServiceMock.dataSet.name.startsWith('promoted_')).toBeTruthy();
    expect(dataStewardHandlerServiceMock.dataSet.datasetChangeLogs).toEqual([]);
    expect(dataStewardHandlerServiceMock.dataSet.version).toEqual(0);
    expect(dataStewardHandlerServiceMock.dataSet.refinementLevel).toEqual(1);
    expect(dataStewardHandlerServiceMock.dataSet.location).toEqual(location.replace(currentLocation, newLocation));

    sut.dataSet.dataFields.forEach(field => {
      expect(dataStewardHandlerServiceMock.dataSet.dataFields).toContain({
        name: field.name,
        type: field.type,
        format: field.format,
        description: field.description,
        validation: field.validation,
        id: null
      });
    });
  }));

  it('should set new dataset on promotion', inject([DataStewardHandlerService], (dataStewardHandlerServiceMock: DataStewardHandlerService) => {
    // Arrange 
    sut.dataSet = mockDataset;
    spyOn(dataStewardHandlerServiceMock, 'setDataSet');

    // Act 
    sut.promoteDatasetToStock();

    // Assert
    expect(dataStewardHandlerServiceMock.setDataSet).toHaveBeenCalledTimes(1);
    expect(dataStewardHandlerServiceMock.setDataSet).toHaveBeenCalledWith(sut.dataSet);
  }));
});
