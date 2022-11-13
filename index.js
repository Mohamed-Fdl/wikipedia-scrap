const rp = require('request-promise')

const cheerio = require('cheerio');

const potusParse = require('./potus')

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'


function scrap() {
    return rp(url).then((html) => {

        const $ = cheerio.load(html)

        let numberOfPresident = $("td[data-sort-value] > b > a").length

        let allPresidents = $("td[data-sort-value] > b > a")

        let linkUrls = []

        for (let i = 0; i < numberOfPresident; i++) {
            linkUrls.push(allPresidents[i].attribs.href);
        }

        return Promise.all(
            linkUrls.map(function(url) {
                return potusParse('https://en.wikipedia.org' + url);
            })
        );
    }).catch((err) => {
        console.log('Error', err)
    })
}

scrap().then((result) => {
    console.log(result)
})