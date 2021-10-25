import {Component, Input} from '@angular/core';
import {DatasetStatus, IDatasetSummary} from 'src/app/shared/api/api';
import {GetDatasetStatusName} from 'src/app/shared/constants';
import {UserHandlerService} from '../../../shared/user/user-handler.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.less']
})
export class DataCardComponent {

  @Input('card')
  card: IDatasetSummary;
  userHasDataStewardRole$ = this.userHandlerService.userHasDataStewardRole$;

  constructor(private userHandlerService: UserHandlerService) { }

  GetDatasetStatusName(): string {
    return GetDatasetStatusName(this.card.status);
  }

  statusIsDeveloping(): boolean {
    return this.card.status === DatasetStatus.Developing;
  }
}
