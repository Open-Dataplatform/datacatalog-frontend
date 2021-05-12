import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.less'],
})
export class TextInputComponent implements OnInit {
  @Input() placeholderText: string;
  @Input() inputType: 'text' | 'text-area' | 'password';
  @Input() value: string;
  @Input() controlName: string;

  @Output()
  valueChange = new EventEmitter();

  modelUpdated = new Subject<string>();

  constructor() {
    this.modelUpdated.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.valueChange.emit(value);
      });
  }

  ngOnInit() {
    if (!this.inputType) {
      this.inputType = 'text';
    }
    this.placeholderText = this.placeholderText ? this.placeholderText : '';
  }

}
