const http = require('http')
const https = require('https')
const fs = require('fs')

const url = "http://img5.imgtn.bdimg.com/it/u=3683420609,1976236174&fm=27&gp=0.jpg"
const protocal = /^http/.test(url) ? http : https;

const options = {
    hostname: 'img5.imgtn.bdimg.com',
    port: 80,
    path: '/it/u=3683420609,1976236174&fm=27&gp=0.jpg',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        'Referer': 'https://image.baidu.com/search',
    }
}

protocal.get(options, (res) => {
    res.pipe(fs.createWriteStream('test.jpg'))
    .on('finish', () => {
        console.info('finished')
    })
})