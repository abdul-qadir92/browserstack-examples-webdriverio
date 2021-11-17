const AxeBuilder = require('@axe-core/webdriverio').default;
const expectChai = require('chai').expect;

describe('Accessibility test', async () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(async () => sessionStorage.clear())
  })

  it('Performs accessibility tests', async() => {
    await (await $('#signin')).click();
    await (await $('.login_wrapper')).waitForDisplayed({ timeout: 3000 });
    const builder = new AxeBuilder({ client: browser }).withRules('color-contrast');
    
    //const builder = new AxeBuilder({ client: browser }).withRules([])
    // this can be used to run the accessibility tests using a specific set of accessibility rules
    //const builder = new AxeBuilder({ client: browser }).withTags([]) 
    // this can be used to run the accessibility tests on a specific tag instead of full page
    
    const results = await builder.analyze();
    const violations = JSON.stringify(results.violations, null, 1);
    console.log(violations);
    expectChai(violations).to.be.empty();
  });
});
