const loginCheck = (username,password) => {
    console.log('use,psd---',username,password)
    if(username === 'zhangsan' && password === '123') {
        return true
    }
    return false
}

module.exports = loginCheck