const rp = require('request-promise');

const cheerio = require('cheerio');

const potusParse = ((url) => {
    return rp(url).then((html) => {

        const $ = cheerio.load(html)

        return $("div.fn").text()
    }).catch((err) => {
        console.log('Error', err)
    })
})

module.exports = potusParse