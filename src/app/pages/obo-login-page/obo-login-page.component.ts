import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserManager } from 'oidc-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-obo-login-page',
  templateUrl: './obo-login-page.component.html',
})
export class OboLoginPageComponent implements OnInit {

  oboUserManager: UserManager;

  constructor(private readonly router: Router) {
    console.log('Constructing Obo login class');
  }

  private isTokenInURL(url: string) {
    return url.includes('code');
  }

  async ngOnInit(): Promise<void> {
    console.log('Got into Obo login');
    this.oboUserManager = new UserManager(environment.oboOidcSettings);
    if (this.isTokenInURL(this.router.url)) {
      await this.oboUserManager.signinPopupCallback(this.router.url);
    }
  }
}
