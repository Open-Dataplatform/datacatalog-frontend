import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserHandlerService} from '../../shared/user/user-handler.service';
import {ParticlesConfig} from './particles-config';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {

  errorMessage: string;
  requestRecieved: boolean;

  constructor(private readonly router: Router,
              private translate: TranslateService,
              private readonly userHandlerService: UserHandlerService) {
  }

  private isTokenInURL(url: string) {
    return url.includes('code');
  }

  async ngOnInit(): Promise<void> {
    if (particlesJS) {
      //particlesJS('particles-js', ParticlesConfig, function() {});
    }

    if (this.isTokenInURL(this.router.url)) {
      await this.userHandlerService.loadUser().then(() => this.router.navigate(['/']));
    }
  }

  async login(): Promise<void> {
    await this.userHandlerService.login();
  }

  async logout(): Promise<void> {
    await this.userHandlerService.logout();
  }
}

declare let particlesJS: any; // Required to be properly interpreted by TypeScript.
