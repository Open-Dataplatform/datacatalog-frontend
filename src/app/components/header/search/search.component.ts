import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DataHandlerService} from "../../../shared/data-handler.service";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import { IDataset } from 'src/app/shared/api/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  @ViewChild('searchContainer', {static: true}) searchContainer: ElementRef;

  isSearching: boolean;
  showing: boolean;

  term: string;
  notHome: boolean;

  suggestions: IDataset[];

  constructor(private readonly router: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly dataHandlerService: DataHandlerService,
              private readonly renderer: Renderer2,
              private readonly location: Location) { }

  ngOnInit() {
    this.notHome = true;
    this.term = '';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.notHome = event.url === '/';
      }
    });

    this.initSearchSuggestions();
    this.renderer.listen('window', 'click',(e:Event)=>{
      // Close suggestions if clicked outside.
      if(e.target !== this.searchContainer.nativeElement){
        this.showing = false;
      }
    });
  }

  goSearch(): void {
    if (this.term.length) {
      this.router.navigate(['/category', this.term]);
      this.term = '';
    }
  }

  initSearchSuggestions() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(

      map((event: any) => {
        return event.target.value; // get value
      })
      ,filter(res => res.length > 2) // if character length greater then 2
      ,debounceTime(200) // Time in milliseconds between key events
      ,distinctUntilChanged() // If previous query is diffent from current
    ).subscribe((text: string) => { // subscription for response
      this.showing = true;
      this.isSearching = true;

      this.subscribeToSuggestions(text);
    });
  }

  subscribeToSuggestions(text: string) {
    this.dataHandlerService.getSearchSuggestions(text).subscribe((res)=>{
      this.isSearching = false;
      this.suggestions = res;
    },()=>{
      this.isSearching = false;
    });
  }

  goBack() {
    this.location.back();
  }

}
