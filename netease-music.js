/*
 * @Author: junjie.lean 
 * @Date: 2018-12-04 13:33:05 
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2018-12-04 17:26:01
 * 
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const isLog = !true;
let count = 1;

/**
 * @description 是否展示log
 * @param { Number } songId 歌曲ID
 * @param { Object } resData 返回数据
 * 
 */
let showLog = (songID, resData) => {
    console.log(`------------------------第 (`, chalk.red(count++), `)首歌曲--------------------------`);
    console.log(`歌曲ID：${chalk.red(songID)}`);
    console.log(`歌曲链接：http://music.163.com/#/song?id=${songID}`);
    console.log(`精彩评论：${resData.hotComments.length}`);
    console.log(`----------------------------------------------------------------------------------`);
    console.log(`\n`);
    console.log(`\n`);
    if (isLog) {
        resData.hotComments.map((item, index) => {
            console.log(`
            歌曲ID:“${songID}”
            用户：“${item.user.nickname}”  
            赞：“${item.likedCount}”
            内容：“${item.content}”
            `)
        })
    }
}

/**
 * @description 请求秘钥
 */

let pr = "params=gnqJJFb50UpxuSIKnFnIKCSIaubZcLS62FfIhBpfAZE%2F3PCRrLWWs00iTyXBG8Vkzjbq%2BY9aham1RCLaR0ozWNIoo%2B1bJHlWMyPRsq9oqP07iGOJYedbDvlx5EuVwjUwKHN9JYxpaBa4z1hOoWZz2HSo9peLDoXFqNp2s3b0Je0e2mNXoXqvQSZZWuEuWEVh&encSecKey=120487feda21cc5f624d931e68f2742134c9e8ddd5b4883e83afefb274438fdbea9cb627c994772cffccad1468851626af7c8343baba9b2266de801f834424581e8a32fc455b0924bb8cfa09dc55a4f6fc60ddcf865aa2d1603410732bb2d2e3ebdd4953097d317ce4d8afd4946ac98608e80c688e82f97ddbee45d775701694";

/**
 * @description 请求头
 */
let op = {
    baseURL: "http://music.163.com",
    hostname: 'music.163.com',
    timeout: 2000,
    methods: "POST",
    // path: '/weapi/v1/resource/comments/R_SO_4_' + i + '?csrf_token=',
    headers: {
        "Cookie": "_ntes_nnid=c1e55c13b14656ebbd6e53e839da0815,1520767811699; _ntes_nuid=c1e55c13b14656ebbd6e53e839da0815; vjuids=346e12082.1626b8405c7.0.1e9b22ebbc26c; _qddaz=QD.1ebgtg.ucnlif.jfxm4cuq; pgv_pvi=466122752; usertrack=ezq0pVrtSUGSJnGgPQUvAg==; _ga=GA1.2.1469745943.1525500228; _iuqxldmzr_=32; WM_TID=cDSrSfP1usgkacmdW9hC7YSls9IZGi5N; __f_=1539138306780; vjlast=1522222237.1540449649.21; vinfo_n_f_l_n3=e58fc276a8231cdb.1.4.1522222237277.1525252918004.1540449859478; __utmc=94650624; WM_NI=z316vk2fFSSFpWAoL2NknnPmnvfSWPUj5ou6Af%2BSCBpckM4181sZAgtVWiDOXjdmQ8EIE1EzRZgvb5PivNqH4Cl4cqPU9vrcmPY7Gbsqqzh5ziOEFVn91lhHg0M6CfesQ2E%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb6e25a81b0ffd3aa7df19e8aa2d45a938e8b84b86bf1b0e18acc67f7f58589cd2af0fea7c3b92abaedffd7f561f2ba8ab4d24eb4898f90cf3a8eb5a28fd367aeaaaab4d65c97b6fb90f83e83bae5b4c24ab4bda5aeb73bfcefbdbbc46db88a998ac7459cb6ac8ed43487978bd2c8729286a997e13f94b7baaff444f89da4d5e27b948bf797f169af9097d8c66ab1afbf9beb3fbab781a6c55eaee7ff8deb44a5f083d7c26ea7ad9fd3c837e2a3; JSESSIONID-WYYY=88g6KlabPGRRlazES6kDSr8aC7NzengTmaRZvFvEdYuH99xV7wJBeCHdxI872leYDcrEeZoXwGGEABegkJUAiWmzZRaP9N%2B%2BIH4ll7ibScesMxGl3KffqW0wfWjjcHyAAJdUVF%2FWfisP9WhvEeasZZJ%2FBKZh0nS1lyNcMkIq%2BwAfGMnC%3A1543909710593; __utma=94650624.1645327508.1520767812.1543900949.1543908433.10; __utmz=94650624.1543908433.10.5.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmb=94650624.1.10.1543908433",
        "Accept": " */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        'Content-Length': pr.length,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'music.163.com',
        'Origin': 'http://music.163.com',
        'Pragma': 'no-cache',
        // 'Referer': 'http://music.163.com/song?id=' + i,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
    }
}

/**
 * @description 发起请求
 * @param { Number } songID 
 * @param { Object } op 
 * @param { Object } pr 
 */
let axiosGetData = (songID, op, pr) => {
    op.path = '/weapi/v1/resource/comments/R_SO_4_' + songID + '?csrf_token=';
    op.headers.Referer = 'http://music.163.com/song?id=' + songID;
    let url = op.path;
    // axios.defaults.baseURL = 'http://music.163.com';
    axios.post(url, pr, op)
        .then((res) => {
            let { data } = res;
            let { hotComments } = data;
            if (hotComments.length != 0) {
                // console.log(hotComments[0])
                let apiOption = {
                    baseURL: "http://10.10.1.178:8080"
                }

                let obj = {
                    songID,
                    hotComments: []
                }
                hotComments.map((item, index) => {
                    obj.hotComments.push({
                        name: item.user.nickname,
                        star: item.likedCount,
                        content: item.content
                    })
                })
                axios.post('/api/post', obj, apiOption).then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.log('server error')
                });
                showLog(songID, data);
                // fs.writeFileSync('data.json', JSON.stringify(obj) + ',', { flag: "a+" });
            }
        })
        .catch((err) => {
            console.log('timeout')
        })
}

//sondId 1323304002
// axiosGetData(1323304002, op, pr)
let startSongID = 413812448;

for (let i = 0; i < 500; i++) {
    axiosGetData(startSongID++, op, pr)
}

