import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display \"DataPlatform\"', () => {
    page.navigateTo();
    expect(page.getMimirHeading()).toEqual('DataPlatform');
  });
});
