/*
 * @Author: junjie.lean 
 * @Date: 2018-08-23 15:32:25 
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2018-08-23 16:45:49
 * 基于node的爬虫操作
 */

const express = require('express');
const cheerio = require('cheerio');
const superagent = require('superagent');

const app = express();

app.get('/', (req, res, next) => {
    superagent.get('http://news.baidu.com/game')
        .end(function (err, sres) {
            if (err) return next(err);

            var $ = cheerio.load(sres.text);
            var arr = [];
            $('.content .row').each((index, ele) => {
                let title = $(ele).find('h1 a');
                let cont = $(ele).find('p');
                arr.push({
                    tit: title.text(),
                    href: title.attr('href'),
                    content: cont.text()
                })
            })
            
            res.send(arr);
        })
});
app.listen(8888, () => {
    console.log('server at 8888,success ')
});

