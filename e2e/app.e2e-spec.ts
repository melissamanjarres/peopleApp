import { PeopleAppPage } from './app.po';

describe('people-app App', function() {
  let page: PeopleAppPage;

  beforeEach(() => {
    page = new PeopleAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
