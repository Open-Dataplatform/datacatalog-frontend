import {Injectable} from '@angular/core';
import {FrontendMetricsClient} from '../api/api';

@Injectable({providedIn: 'root'})
export class FrontendMetricsService {

  constructor(private readonly frontendMetricsClient: FrontendMetricsClient) {}

  public oboFlowInitiated() {
    this.frontendMetricsClient.oboFlowInitiated().subscribe();
  }

  public previewDataInitiated() {
    this.frontendMetricsClient.previewDataClicked().subscribe();
  }
}
