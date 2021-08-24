import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OBO_USER_MANAGER_TOKEN } from 'src/app/shared/user/user-handler.service';

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
