describe('StackDemo login', async () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(async () => sessionStorage.clear())
  })

  it(`Login sholud not be successful for account with username 'locked_user'`, async function() {
      await (await $('#signin')).click();
      await (await $('#username input')).setValue(browser.config.accounts[1].username + '\n');
      await (await $('#password input')).setValue(browser.config.accounts[1].password + '\n');
      await (await $('#login-btn')).click();

      await expect(await $('.api-error')).toHaveText('Your account has been locked.');
  });
})
