import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appAutosize]'
})
export class AutosizeDirective {

  element: ElementRef;

  constructor(private el: ElementRef) {
    this.element = el;
  }

  ngDoCheck() {
    this.resize();
  }

  @HostListener('keyup') onKeyUp() {
    this.resize();
  }

  resize() {
    this.element.nativeElement.style.height = "auto";
    this.element.nativeElement.style.height = (this.element.nativeElement.scrollHeight)+"px";
  }

}
