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
    const builder = new AxeBuilder({ client: browser });
    
    //const builder = new AxeBuilder({ client: browser }).withRules([])
    // this can be used to run the accessibility tests using a specific set of accessibility rules
    //const builder = new AxeBuilder({ client: browser }).withTags([]) 
    // this can be used to run the accessibility tests on a specific tag instead of full page
    
    const results = await builder.analyze();
    violations = results.violations;
    expectChai(violations.length).to.equal(8); //There are 8 accessibility violations in the demo website.
  });
});
