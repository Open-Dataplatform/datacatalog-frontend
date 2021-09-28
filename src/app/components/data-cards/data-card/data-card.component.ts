import {Component, Input, OnInit} from '@angular/core';
import { IDataset } from 'src/app/shared/api/api';
import { GetDatasetStatusName } from 'src/app/shared/constants';
import {UserHandlerService} from "../../../shared/user/user-handler.service";

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.less']
})
export class DataCardComponent {

  @Input('card')
  card: IDataset;
  userHasDataStewardRole$ = this.userHandlerService.userHasDataStewardRole$;

  constructor(private userHandlerService: UserHandlerService) { }

  GetDatasetStatusName(): string {
    return GetDatasetStatusName(this.card.status);
  }
  
}
