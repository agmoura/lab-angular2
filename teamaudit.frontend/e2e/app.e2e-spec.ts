import { TaPage } from './app.po';

describe('ta App', function() {
  let page: TaPage;

  beforeEach(() => {
    page = new TaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
