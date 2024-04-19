describe('scrolling',()=>{
    beforeEach('Open app', async() => {
        await browser.maximizeWindow();
        await browser.url('https://www.primevideo.com/storefront/ref=atv_hom_pri_c_9zZ8D2_hm_mv?contentType=movie&contentId=home');
       
      })

    it('Drag to swipe', async() => {
        await browser.scroll(0, 1355);
        await $('//p[text()=\'Thriller movies\']').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        await browser.pause(3000);

        var item = 4;
        var drag = await $('//p[text()=\'Thriller movies\']/../../../../../div/ul/li['+item+']');
        var size  = await $('//p[text()=\'Thriller movies\']/../../../../../div/ul/li['+item+']').getSize();
        console.log('size'+size.width());
        var xoffset = 0-2*$('//p[text()=\'Thriller movies\']/../../../../../div/ul/li['+item+']').getSize().width;
        console.log('xoffset'+xoffset);

        var found = false;

        while(item!=20){
            await $('//p[text()=\'Thriller movies\']/../../../../../div/ul/li['+item+']').dragAndDrop({ x: parseInt(xoffset), y: 0 });
            Thread.sleep(2000);
            item+=2;
        }
    })
})