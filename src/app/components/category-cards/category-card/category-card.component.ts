import {Component, Input, OnInit} from '@angular/core';
import { ICategory } from 'src/app/shared/api/api';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.less']
})
export class CategoryCardComponent implements OnInit {

  @Input()
  category: ICategory;

  constructor() { }

  ngOnInit() {

  }

  getBackgroundImage() {
    // let assetName = this.category.name.replace(' ', '_');
    // assetName = assetName.replace('CO²', 'Co2');
    // return `url('./assets/categories/${assetName}.jpg')`;
    return '';
  }


}
