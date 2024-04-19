describe('scrolling',()=>{
    beforeEach('Open app', async() => {
        await browser.maximizeWindow();
        await browser.url('https://bstackdemo.com/');
       
      })

    it('Scoll to bottom', async() => {
        await $('//*[@id=\'25\']/div[4]').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        await browser.pause(3000);

        //a = await browser.execute('window.document.querySelector("#\\\\32 5 > div.shelf-item__buy-btn").getBoundingClientRect()',[])
        a = await browser.execute('document.querySelector("[id=\'25\']").getBoundingClientRect()',[])
        console.log('a = ', a)
        
        const link = await browser.findElement('css selector', '#\\32 5 > div.shelf-item__buy-btn')
        c = await browser.getElementRect(link['element-6066-11e4-a52e-4f735466cecf'])
        console.log(c)

        await $('//*[@id=\'25\']/div[4]').moveTo()
        await browser.pause(3000);
    })
})