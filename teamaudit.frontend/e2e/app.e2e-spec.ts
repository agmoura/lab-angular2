import { TeamauditPage } from './app.po';

describe('teamaudit App', function() {
  let page: TeamauditPage;

  beforeEach(() => {
    page = new TeamauditPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
