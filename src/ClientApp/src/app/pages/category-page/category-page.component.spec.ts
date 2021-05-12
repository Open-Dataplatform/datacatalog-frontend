import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';

import { CategoryPageComponent } from './category-page.component';
import {SharedModule} from "../../shared/shared.module";
import {DataCardsModule} from "../../components/data-cards/data-cards.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import {DataHandlerService} from "../../shared/data-handler.service";
import { Observable, of } from 'rxjs';
import { Components } from '../../../types/dataplatform-api'
import IDataset = Components.Schemas.IDataset;
import { ParamMap } from '@angular/router';

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, DataCardsModule, RouterTestingModule, HttpClientTestingModule, TranslateModule.forRoot() ],
      declarations: [ CategoryPageComponent ],
      providers: [DataHandlerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call datahandlerservice.getCategorySets when onScroll is called and isCategory is true', inject([DataHandlerService], () => {
    // Arrange 
    component.isCategory = true;

    // @ts-ignore
    spyOn(component.dataHandlerService, 'getCategorySets').and.returnValue(new Observable<IDataset[]>());

    // Act 
    component.onScroll();

    // Assert
    // @ts-ignore
    expect(component.dataHandlerService.getCategorySets).toHaveBeenCalled();
  }));

  it('should call datahandlerservice.getDataSets when onScroll is called and isCategory is false', inject([DataHandlerService], () => {
    // Arrange   
    component.isCategory = false;

    // @ts-ignore
    spyOn(component.dataHandlerService, 'getDataSets').and.returnValue(new Observable<IDataset[]>());

    // Act 
    component.onScroll();

    // Assert
    // @ts-ignore
    expect(component.dataHandlerService.getDataSets).toHaveBeenCalled();
  }));

  it('should append datasets when calling onScroll and is category is true', inject([DataHandlerService], () => {
    // Arrange   
    component.isCategory = true;
    const originalDatacards : IDataset[] = [{name: 'set1'}, {name: 'set2'}];
    component.dataCards = originalDatacards.slice();
    const dataCards: IDataset[] = [{name: 'set3'}, {name: 'set4'}];

    // @ts-ignore
    spyOn(component.dataHandlerService, 'getCategorySets').and.returnValue(of<IDataset[]>(dataCards));

    // Act 
    component.onScroll();
    
    // Assert
    expect(component.dataCards).toEqual(originalDatacards.concat(dataCards));
  }));

  it('should append datasets when calling onScroll and is category is false', inject([DataHandlerService], () => {
    // Arrange   
    component.isCategory = false;
    const originalDatacards : IDataset[] = [{name: 'set1'}, {name: 'set2'}];
    component.dataCards = originalDatacards.slice();
    const dataCards: IDataset[] = [{name: 'set3'}, {name: 'set4'}];

    // @ts-ignore
    spyOn(component.dataHandlerService, 'getDataSets').and.returnValue(of<IDataset[]>(dataCards));

    // Act 
    component.onScroll();
    
    // Assert
    expect(component.dataCards).toEqual(originalDatacards.concat(dataCards));
  }));

  it('should get datasets on onInit call when category parameter is not present', inject([DataHandlerService], () => {
    // Arrange  
    const paramMap: ParamMap = { get: (key: string) => {
        switch (key) {
          case 'term':
            return 'searchingDataSets'
        }
      },
      getAll: (name: string) => { return ['']},
      has: (name: string) => true,
      keys: []
    }
    const dataCards: IDataset[] = [{name: 'set1'}, {name: 'set2'}, {name: 'set3'}, {name: 'set4'}];
    // @ts-ignore
    spyOn(component.dataHandlerService, 'getDataSets').and.returnValue(of<IDataset[]>(dataCards));

    // @ts-ignore
    spyOnProperty(component.activeRoute, 'paramMap').and.returnValue(of<ParamMap>(paramMap));

    // Act
    component.ngOnInit();

    // Assert
    expect(component.dataCards).toEqual(dataCards);
    // @ts-ignore
    expect(component.dataHandlerService.getDataSets).toHaveBeenCalledWith(paramMap.get('term'), component.pageSize, 0);
  }));

  it('should get datasets categories on onInit call when category parameter is present', inject([DataHandlerService], () => {
    // Arrange  
    const paramMap: ParamMap = { get: (key: string) => {
      switch (key) {
        case 'term':
          return 'searchingCategoryDataSets'
        case 'cat':
          return 'true'
        }
      },
      getAll: (name: string) => { return ['']},
      has: (name: string) => true,
      keys: []
    }
    const dataCards: IDataset[] = [{name: 'set1'}, {name: 'set2'}, {name: 'set3'}, {name: 'set4'}];
    // @ts-ignore
    spyOn(component.dataHandlerService, 'getCategorySets').and.returnValue(of<IDataset[]>(dataCards));

    // @ts-ignore
    spyOnProperty(component.activeRoute, 'paramMap').and.returnValue(of<ParamMap>(paramMap));

    // Act
    component.ngOnInit();

    // Assert
    expect(component.dataCards).toEqual(dataCards);
    // @ts-ignore
    expect(component.dataHandlerService.getCategorySets).toHaveBeenCalledWith(paramMap.get('term'), component.pageSize, 0);
  }));
});
