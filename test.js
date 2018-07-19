const puppeteer = require('puppeteer')

async function getScreenShot() {
    let browser = await puppeteer.launch()
    let page = await browser.newPage()
    await page.goto('http://image.baidu.com')
    await page.screenshot({path: 'screenshot.png'})
    await browser.close()
}

function main() {
    getScreenShot()
    console.log('finished')
}

main()