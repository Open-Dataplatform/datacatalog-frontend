import { Component, Inject, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserManager } from 'oidc-client';
import { OBO_USER_MANAGER_TOKEN } from 'src/app/app.module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-obo-login-page',
  templateUrl: './obo-login-page.component.html',
})
export class OboLoginPageComponent implements OnInit {
  constructor(private readonly router: Router,
    @Inject(OBO_USER_MANAGER_TOKEN)
    private readonly oboUserManager
  ) {
  }

  private isTokenInURL(url: string) {
    return url.includes('code');
  }

  async ngOnInit(): Promise<void> {
    if (this.isTokenInURL(this.router.url)) {
      await this.oboUserManager.signinPopupCallback(this.router.url);
    }
  }
}
