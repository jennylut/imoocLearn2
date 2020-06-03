const { SuccessModal, ErrorModal } = require('../model/resModel') 
const login = require('../controller/user')

const getCookieExpire = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString()',d.toGMTString())
    return d.toGMTString()
}

const handleUserRouter = (req,res) => {
    const method = req.method


    // login
    if(method === 'GET' && req.path === '/api/user/login') {
        // const { username,password } = req.body
        const { username,password } = req.query
        const result = login(username,password)
        return result.then(data=>{
            if(data.username){
                res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpire()}`)
                return new SuccessModal(result)
            }
            return new ErrorModal('login error')
        })
    }

    // 登录验证测试
    if(method === 'GET' && req.path ==='/api/user/login-test'){
        if(req.cookie.username){
            return  Promise.resolve( new SuccessModal({
                username:req.cookie.username
            }))
        }
        return Promise.resolve(new ErrorModal('login error'))
    }

}

module.exports = handleUserRouter