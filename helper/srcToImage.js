const fs = require('fs')
const path = require('path')
const request = require('request')

module.exports = (src) => {
    if (/\.(jpg|gif|png)$/.test(src)) {
        urlToImg(src)
    } else {
        base64ToImg(src)
    }
}

var urlToImg = (url) => {
    const options = {
        url: url,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
            'Referer': 'https://image.baidu.com/search',
        }
    }
    const tag = Date.now().toString()
    const ext = path.extname(url)
    request(options)
    .pipe(fs.createWriteStream(`img/${tag}${ext}`))
}

var base64ToImg = (base64Str) => {
    const matches = base64Str.match(/^data:image\/(\w+);base64,(.+)$/)
    // console.log(`matches[1]: ${matches[1]},\n matches[2]: ${matches[2]}\n`)
    const tag = Date.now().toString()
    try {
        if (matches[1] && matches[2]) {
            const ext = '.' + matches[1].replace('jpeg', 'jpg')
            fs.writeFile(`img/${tag}${ext}`, matches[2], 'base64', (err) => {
                console.error(err)
            })        
        }
    } catch (ex) {
        console.error(ex)
    }
}