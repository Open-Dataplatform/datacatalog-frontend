import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataHandlerService} from "../../shared/data-handler.service";
import { IDatasetSummary } from 'src/app/shared/api/api';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.less']
})
export class CategoryPageComponent implements OnInit {
  term: string;
  isCategory: boolean;
  dataCards: IDatasetSummary[];
  pageSize: number = 50;
  pageIndex: number = 0;

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly dataHandlerService: DataHandlerService,
  ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.pageIndex = 0;
      this.term = params.get('term');
      this.isCategory = !!params.get('cat');
      if (this.isCategory) {
        this.dataHandlerService.getCategorySets(this.term, this.pageSize, this.pageIndex).subscribe(response => {
          this.updateDataCards(response);
        });
      } else {
        this.dataHandlerService.getDataSets(this.term, this.pageSize, this.pageIndex).subscribe(response => {
          this.updateDataCards(response);
        });
      }
    });
  }

  onScroll() {
    if (this.isCategory) {
      this.dataHandlerService.getCategorySets(this.term, this.pageSize, this.pageIndex).subscribe(response => {
        this.updateDataCards(response);
      });
     }
    else {
      this.dataHandlerService.getDataSets(this.term, this.pageSize, this.pageIndex).subscribe(response => {
        this.updateDataCards(response);
      });
    }
  }

  updateDataCards(datasets: IDatasetSummary[]) {

    // Merge new and old datasets and sort by name
    this.dataCards = [...this.dataCards ?? [], ...datasets]
      .sort((a, b) => a.name === undefined || b.name == undefined ? NaN : a.name.localeCompare(b.name));
    
    this.pageIndex++;
  }
}
