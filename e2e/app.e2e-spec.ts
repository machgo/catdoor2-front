import { Catdoor2FrontPage } from './app.po';

describe('catdoor2-front App', function() {
  let page: Catdoor2FrontPage;

  beforeEach(() => {
    page = new Catdoor2FrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
