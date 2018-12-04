/*
 * @Author: junjie.lean 
 * @Date: 2018-12-04 13:33:05 
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2018-12-04 17:26:01
 * 
 */
console.log('services start')
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');
const isLog = !true;
let myID = "427401622";



//爬取序号
let count = 1;
//全局配置
let config = {
    //要爬取点赞数大于此值的评论
    condition: 10000,
    //第一首歌的id
    // startSongID: 468513829,
    //需要爬取的数量
    quantity: 1000,
    //请求密钥
    secretKey: "params=gnqJJFb50UpxuSIKnFnIKCSIaubZcLS62FfIhBpfAZE%2F3PCRrLWWs00iTyXBG8Vkzjbq%2BY9aham1RCLaR0ozWNIoo%2B1bJHlWMyPRsq9oqP07iGOJYedbDvlx5EuVwjUwKHN9JYxpaBa4z1hOoWZz2HSo9peLDoXFqNp2s3b0Je0e2mNXoXqvQSZZWuEuWEVh&encSecKey=120487feda21cc5f624d931e68f2742134c9e8ddd5b4883e83afefb274438fdbea9cb627c994772cffccad1468851626af7c8343baba9b2266de801f834424581e8a32fc455b0924bb8cfa09dc55a4f6fc60ddcf865aa2d1603410732bb2d2e3ebdd4953097d317ce4d8afd4946ac98608e80c688e82f97ddbee45d775701694",
    //请求cookie
    cookie: "_ntes_nnid=c1e55c13b14656ebbd6e53e839da0815,1520767811699; _ntes_nuid=c1e55c13b14656ebbd6e53e839da0815; vjuids=346e12082.1626b8405c7.0.1e9b22ebbc26c; _qddaz=QD.1ebgtg.ucnlif.jfxm4cuq; pgv_pvi=466122752; usertrack=ezq0pVrtSUGSJnGgPQUvAg==; _ga=GA1.2.1469745943.1525500228; _iuqxldmzr_=32; WM_TID=cDSrSfP1usgkacmdW9hC7YSls9IZGi5N; __f_=1539138306780; vjlast=1522222237.1540449649.21; vinfo_n_f_l_n3=e58fc276a8231cdb.1.4.1522222237277.1525252918004.1540449859478; __utmc=94650624; WM_NI=z316vk2fFSSFpWAoL2NknnPmnvfSWPUj5ou6Af%2BSCBpckM4181sZAgtVWiDOXjdmQ8EIE1EzRZgvb5PivNqH4Cl4cqPU9vrcmPY7Gbsqqzh5ziOEFVn91lhHg0M6CfesQ2E%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb6e25a81b0ffd3aa7df19e8aa2d45a938e8b84b86bf1b0e18acc67f7f58589cd2af0fea7c3b92abaedffd7f561f2ba8ab4d24eb4898f90cf3a8eb5a28fd367aeaaaab4d65c97b6fb90f83e83bae5b4c24ab4bda5aeb73bfcefbdbbc46db88a998ac7459cb6ac8ed43487978bd2c8729286a997e13f94b7baaff444f89da4d5e27b948bf797f169af9097d8c66ab1afbf9beb3fbab781a6c55eaee7ff8deb44a5f083d7c26ea7ad9fd3c837e2a3; JSESSIONID-WYYY=88g6KlabPGRRlazES6kDSr8aC7NzengTmaRZvFvEdYuH99xV7wJBeCHdxI872leYDcrEeZoXwGGEABegkJUAiWmzZRaP9N%2B%2BIH4ll7ibScesMxGl3KffqW0wfWjjcHyAAJdUVF%2FWfisP9WhvEeasZZJ%2FBKZh0nS1lyNcMkIq%2BwAfGMnC%3A1543909710593; __utma=94650624.1645327508.1520767812.1543900949.1543908433.10; __utmz=94650624.1543908433.10.5.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmb=94650624.1.10.1543908433",
}

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
 * @description 请求头
 */

let op = {
    baseURL: "http://music.163.com",
    hostname: 'music.163.com',
    timeout: 2000,
    methods: "POST",
    headers: {
        "Cookie": config.cookie,
        "Accept": " */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        'Content-Length': config.secretKey.length,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'music.163.com',
        'Origin': 'http://music.163.com',
        'Pragma': 'no-cache',
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

            // console.log(hotComments)
            if (hotComments.length != 0) {
                // console.log(hotComments[0])
                let apiOption = {
                    baseURL: "http://10.10.1.178:8080"
                }

                let obj = {
                    songID,
                    hotComments: []
                }
                hotComments.filter((item) => {
                    return item.likedCount > config.condition
                }).map((item, index) => {
                    obj.hotComments.push({
                        name: item.user.nickname,
                        star: item.likedCount,
                        content: item.content
                    })
                })
                // axios.post('/api/post', obj, apiOption).then((res) => {
                //     console.log(res.data)
                // }).catch((err) => {
                //     console.log('server error')
                // });
                showLog(songID, data);
                if (obj.hotComments.length > 0) {
                    fs.writeFile('data.json', JSON.stringify(obj) + ',', { flag: "a+" }, (err) => {
                        console.log(err)
                    });
                }

            }
        })
        .catch((err) => {
            if (err.config && err.config.timeout) {
                //  console.log(err.config.timeout)
                console.log('timeout')
            } else {
                console.log(err)
            }
        })
}

//sondId 1323304002
// axiosGetData(1323304002, op, pr)

let songIDlist = [];
let getLikelist = async () => {
    let idlist = [];
    let op = {
        baseURL: "http://music.163.com",
        hostname: 'music.163.com',
        timeout: 2000,
        methods: "POST",
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Length": 518,
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: " _ntes_nuid=3d78e1e9ead2f0f75361cd596ebb50fd; _ntes_nnid=915b8a23dd21e1123f6e25eed4dbc579,1523450720716; pgv_pvi=906884096; _qddaz=QD.c2zpdt.6fq4yo.jfv384ce; _iuqxldmzr_=32; __utma=94650624.2133658051.1543933400.1543933400.1543933400.1; __utmc=94650624; __utmz=94650624.1543933400.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; WM_NI=LTp56iToj9mcHPwkI0wWhKTXakg02kA2KWv0dAUYF2G%2FRIgmw7bxfe9VwZ9j485HMew%2BaRD3WsnntkTOc1LoUTtD7TWMbBb7YGdqN4VHFUxoHh11VwhvlrK9X2DKVRcTcUc%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb0cc72bab5a5b2c721a5b48fb7c45e829e9b84b841baab8988b76d9c96a598d22af0fea7c3b92a908cc0d6b56398b1a6daf0698c90b98ccc3cb589a8acd754a3b5a9d1b16183ee85b8f53ca89f9bbac53a85f19eaae667b5e9ae99e56ffb8ab9bbbc62f8e8fba9d06fb5f5afb3c73995ada28ff7619891add2cf65978cbca5b6609593aea3e13d9b99ac92cd4096988ab6fb658cb8ffd2d57dacaaa493ca339cee8cacd55aa18cadb6e237e2a3; WM_TID=hJLEMsrYLnNBVUFBAFc8amuSh5hSdgxH; playerid=83057142; __remember_me=true; JSESSIONID-WYYY=aOw%2BiMCkc0wM8bSSdAMqKI1sNP70dM9sbturgPDHGwm5ESPoDUe2zh%5Cv7uGOkrd6FqsjTIvkHjJ32aZry%2BPxee7JmjzatmWy5w0OkkNO9ewfOiaXqPYsm9%5CZU7BrEk1oH6ameT1J78wQo6PbiKStFFdjBu%5C1TzdbBQjcWyXl2Q%2BEscxp%3A1543940419637; MUSIC_U=0f14ba94ceddeeae958ee14a112e5c24c204599d74f6da2a31f26b3549a74c36b39d393e582dc3b644d1343759c700a2af9e62a8590fd08a; __csrf=3d17e1b905bded16b08d55b143d3566a; __utmb=94650624.26.10.1543933400",
            "DNT": 1,
            Host: "music.163.com",
            Origin: "https://music.163.com",
            Pragma: " no-cache",
            Referer: " https://music.163.com/my/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
        }
    }
    let pr = "params=5vBvST%2B2IV6A4Y7AHSWIvVJDGlLTcMuX5pCQrlJS6vI4%2BcHMTrCNhBpXWoYSSyQ4e7Ba1D7rgZE4QdjxVQK7TNHAmMVjOga7tY9GjNtDRGf4FTMAf79HQfRSqbyGadDEXAF5d1lhZHwdcvKfhYNicXuuyTzwtHwsGsgaI2pv7SV9I5OZBbIUHbKQRAjr3u6b5mzGTbssEeY1ei2UlzOLfJV8ddB2z48IOw4nUL2U%2F0c%3D&encSecKey=9f0f704cc98af223ca1eb9a382b44f2360f677d8489554530d078b6ffc187d9d5a4d4b0e36fd6a35ed92d9bf0f75cb3b6eac4ffdb409592ed1cb18f382cf9aaaa5fc87d70440d320726c91782936edbac3216cd6bfc27112a9aa141e1c41b3b6efc82b51fedc19dbd544661994e7b7573584bcc21b5945e6a47af167c59921f6";
    let res = await axios.post('/weapi/v3/playlist/detail?csrf_token=3d17e1b905bded16b08d55b143d3566a', pr, op);
    let { data } = res;
    let { privileges, playlist } = data;
    if (res.status == 200) {
        let list = playlist.tracks;
        for (let item of list) {
            let o = {
                singer: item.ar ? item.ar[0].name : 'unknow',
                name: item.name,
                songID: item.id
            }
            idlist.push(o)
        }
    } else {
        console.log(res)
    }
    // console.log(idlist)
    return idlist;
}
getLikelist().then((data) => {
    // console.log(data)
    //请求调用
    for (song of data) {
        axiosGetData(song.songID, op, config.secretKey)
    }
}).catch((err)=>{
    console.log(err)
});


