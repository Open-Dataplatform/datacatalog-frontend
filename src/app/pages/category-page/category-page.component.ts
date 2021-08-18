import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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

  constructor(private readonly activeRoute: ActivatedRoute, private readonly dataHandlerService: DataHandlerService) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.pageIndex = 0;
      this.term = params.get('term');
      this.isCategory = !!params.get('cat');
      if (this.isCategory) {
        this.dataHandlerService.getCategorySets(this.term, this.pageSize, this.pageIndex).subscribe(response => {
          this.dataCards = response;
          this.pageIndex++;
        });
      } else {
        this.dataHandlerService.getDataSets(this.term, this.pageSize, this.pageIndex).subscribe(response => {
          this.dataCards = response;
          this.pageIndex++;
        });
      }
    });
  }

  onScroll() {
    if (this.isCategory) {
      this.dataHandlerService.getCategorySets(this.term, this.pageSize, this.pageIndex).subscribe(response => {
        Array.prototype.push.apply(this.dataCards, response);
        this.pageIndex++;
      });
     }
    else {
      this.dataHandlerService.getDataSets(this.term, this.pageSize, this.pageIndex).subscribe(response => {
        Array.prototype.push.apply(this.dataCards, response);
        this.pageIndex++;
      });
    }
  }
}
