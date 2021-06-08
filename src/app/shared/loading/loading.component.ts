import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit {

  @Input() showLoading: boolean;
  @Input() size: number = 2;
  @Input() state: 'loading' | 'saving' = 'loading';

  constructor() { }

  ngOnInit() {
  }

}
