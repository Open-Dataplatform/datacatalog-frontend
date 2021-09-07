import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import { Dataset } from 'src/app/shared/api/api';
import {DataStewardHandlerService} from "../../pages/data-steward/data-steward-handler.service";
import {UserHandlerService} from "../../shared/user/user-handler.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit{

  dataSteward: boolean;
  login: boolean;
  category: boolean;
  userLoggedIn$ = this.userHandlerService.userLoggedIn$;
  userHasDataStewardRole$ = this.userHandlerService.userHasDataStewardRole$;
  categoryId: string;


  constructor(private readonly router: Router,
              private readonly userHandlerService: UserHandlerService,
              private readonly dataStewardHandlerService: DataStewardHandlerService
    ) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const regex = RegExp('datasteward');
        this.dataSteward = regex.test(event.url);
        const loginRegExp = RegExp('login');
        this.login = loginRegExp.test(event.url);
        const categoryRegExp = RegExp('category/.*/true$');
        this.category = categoryRegExp.test(event.url);
        
        // Get the category Id from the URL. This is kind of a hack but we cannot use ActivatedRoute og paramMap here
        if (this.category)
          this.categoryId = event.url.split('/')[2];
      }
    });
  }

  newDataSet() {
    this.dataStewardHandlerService.setDataSet(new Dataset());
  }

  logout() {
    this.userHandlerService.logout();
    this.router.navigate(['login']);
  }

  editCategory() {
    this.router.navigate(['/category', this.categoryId, true, 'edit'])
  }
}
