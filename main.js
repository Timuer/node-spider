const config = require('./config');
const srcToImage = require('./helper/srcToImage');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://image.baidu.com');
    console.info('visiting image.baidu.com...')
    await page.setViewport({width: 1920, height: 1080});

    await page.focus('#kw');
    await page.keyboard.sendCharacter(config.keyword);
    // puppeteer无法点击不可见的元素，而该按钮元素的display为None
    await page.$eval('.s_btn', (elem) => {
        elem.style.display = 'inline'
    })
    await page.click('.s_btn');
    console.info('send search information...')

    page.on('load', async () => {
        console.info('start fetching data...')
        const srcs = await page.$$eval('img.main_img', (imgs) => {
            return imgs.map(img => img.src)
        })

        srcs.forEach((src) => {
            srcToImage(src)
        })
        await browser.close()
    })
})();