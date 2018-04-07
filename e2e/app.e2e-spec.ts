import { AppPage } from './app.po';
import { element, by, ElementFinder, ElementArrayFinder, browser, ExpectedConditions, promise } from 'protractor';

describe('tic-tac-toe App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('X should win', () => {
    page.navigateTo();
    // expect(element(by.css('app-board'))).toBeDefined();
    const board: ElementFinder = element(by.css('app-board'));
    // const score: ElementFinder = element(by.tagName('board-main'));
    const cubes: ElementArrayFinder = board.all(by.tagName('app-cube'));
    cubes.get(0).click();
    cubes.get(1).click();
    cubes.get(4).click();
    cubes.get(2).click();
    cubes.get(8).click();

    // element(by.css('result')).then((text) => {
    //   console.log("this is the element", text);
    // });

    // browser.wait(by.css('result')).then((isPresent) => {
    //   console.log("result was found UUUUUUUUUUUUUu", isPresent);
    // });
    // const result: ElementFinder = element(by.css('result'));
    // if (result) {
    //   console.log("result was foundFFFFFFFFFFFFFFFFF!", result.getTagName());

    //   result.getInnerHtml().then((text) => {
    //     console.log(text);
    //   });
    // }

    waitForClass('result').then(() => {
      element(by.className('result')).getText().then((text) => {
        expect(text).toContain('X is the Winner');
      });
    });

  });
});

export function waitForClass(className: string): promise.Promise<{}> {
  return browser.wait(ExpectedConditions.visibilityOf(element.all(by.className(className)).first()), 1000);
}
