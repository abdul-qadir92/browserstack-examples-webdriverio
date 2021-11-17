describe('StackDemo login', async () => {

    beforeEach('Open StackDemo', async () => {
      await browser.url('');
    })

    afterEach('clear sessionstorage', async () => {
      await browser.execute(async () => sessionStorage.clear())
    })

    it(`Login sholud be successful for account with username 'existing_orders_user'`, async function() {
        await (await $('#signin')).click();
        await (await $('#username input')).setValue(browser.config.accounts[2].username + '\n');
        await (await $('#password input')).setValue(browser.config.accounts[2].password + '\n');
        await (await $('#login-btn')).click();

        await expect(await $('.username')).toHaveText(browser.config.accounts[2].username);
        await (await $('#logout')).click();
    });
})
