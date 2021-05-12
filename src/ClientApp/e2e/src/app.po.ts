import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getDataPlatformHeading() {
    return element(by.css('.login__product')).getText();
  }
}
