const items = require('../../../../resources/data/login_cases.json')

describe('Password input validation', async function () {
  items.forEach(async (item) => {

    beforeEach('Open StackDemo', async () => {
      await browser.url('');
    })

    afterEach('clear sessionstorage', async () => {
      await browser.execute(async () => sessionStorage.clear())
    })

    it(`Login should not be successful for account with username ''`, async () => {
      await (await $('#signin')).click();
      await (await $('#username input')).setValue(item.username + '\n');
      await (await $('#password input')).setValue(item.password + '\n');
      await (await $('#login-btn')).click();

      await expect(await $('.api-error')).toHaveText(item.expected_message);
    });
  })
});
