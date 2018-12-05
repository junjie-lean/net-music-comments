let password = '';
//登录
let login = async () => {
    let res = await axios.get(`/login/cellphone?phone=18030721892&password=${password}&timestamp=${Math.random()}`, {
        baseURL: 'http://localhost:3000'
    })
    let data = { res };
    if (res.status == 200 && data.code == 200) {
        console.log('login success')
        // console.log(res.data)
        myID = data.account.id; //427401622
    }

}
// login()

//get user detail by userid
let getUserDetail = async () => {
    let res = await axios.get(`/user/detail?uid=${myID}`, {
        baseURL: 'http://localhost:3000'
    })
    let data = { res };
    if (res.status == 200) {
        console.log('get user detail  success')
        // console.log(data)
    }
}
// getUserDetail();

//get user like list by userid
let getLikelist = async () => {
    let res = await axios.get(`/likelist?uid=${myID}`, {
        baseURL: 'http://localhost:3000'
    })
    let data = { res };
    if (res.status == 200) {
        console.log('get likelist success')
        console.log(res.data)
    }
}
// getLikelist()
