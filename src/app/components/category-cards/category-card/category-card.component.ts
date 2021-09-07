import {Component, Input, OnInit} from '@angular/core';
import { ICategory } from 'src/app/shared/api/api';
import { EMPTY_GUID } from 'src/app/shared/constants';
import { UserHandlerService } from 'src/app/shared/user/user-handler.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.less']
})
export class CategoryCardComponent implements OnInit {

  @Input()
  category: ICategory;

  newCategoryId: string = EMPTY_GUID;
  userHasDataStewardRole$ = this.userHandlerService.userHasDataStewardRole$;


  constructor(
    private readonly userHandlerService: UserHandlerService
  ) { }

  ngOnInit() {

  }

  getBackgroundImage() {
    // let assetName = this.category.name.replace(' ', '_');
    // assetName = assetName.replace('CO²', 'Co2');
    // return `url('./assets/categories/${assetName}.jpg')`;
    return '';
  }


}
