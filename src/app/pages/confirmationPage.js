const Page = require('./basePage');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class ConfirmationPage extends Page {
  /**
   * define selectors using getter methods
   */
  get confirmationMessage() {
    return $('#confirmation-message')
  }

  get continueShoppingButton() {
    return $('div.continueButtonContainer button')
  }

  get downloadPDFLink() {
    return $('#downloadpdf');
  }

  async clickContinueShoppingButton() {
    await (await this.continueShoppingButton).click();
  }

  async waitForConfirmationToBeDisplayed() {
    await (await this.confirmationMessage).waitForDisplayed({ timeout: 5000 });
  }

  async clickDownloadPdf() {
    await (await this.downloadPDFLink).click();
  }

  async downloadedFileExists(browser, fileName) {
    await browser.pause(2000);
    const fileExists = await browser.executeScript('browserstack_executor: {"action": "fileExists", "arguments": {"fileName": "'+ fileName + '"}}',[]);
    expect(await fileExists).toEqual(true);
  }

}

module.exports = new ConfirmationPage();
