describe('StackDemo Offers', async () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(() => sessionStorage.clear())
  })

  it('Check offers for India', async () => {
    await (await $('#signin')).click();
    await (await $('#username input')).setValue(browser.config.accounts[0].username + '\n');
    await (await $('#password input')).setValue(browser.config.accounts[0].password + '\n');
    await (await $('#login-btn')).click();

    await browser.execute(async function() {
        window.navigator.geolocation.getCurrentPosition = async function(success) {
        var position = { coords : { latitude: "1", longitude: "103" } }; 
        success(position);
      }
    });
    await (await $('#offers')).click();

    await (await $(".offer")).waitForDisplayed({ timeout: 5000 });
    await expect(await $$('.offer')).toHaveLength(3);
  })
})
