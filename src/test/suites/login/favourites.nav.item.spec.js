describe('StackDemo login', async () => {

  beforeEach('Open StackDemo', async () => {
    await browser.url('');
  })

  afterEach('clear sessionstorage', async () => {
    await browser.execute(async () => sessionStorage.clear())
  })

  it('Navigated to login on clicking favourites Nav Item', async () => {
    await (await $('#favourites')).click();
    
    await browser.waitUntil(async () => {
      let pageUrl = await browser.getUrl();
      return await pageUrl.indexOf('signin?favourites=true') > -1
    }, 5000)
  })

})
