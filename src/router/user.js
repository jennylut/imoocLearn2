const { SuccessModal, ErrorModal } = require('../model/resModel') 
const login = require('../controller/user')
const { set } = require('../db/redis')

const getCookieExpire = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000)) // 设置过期时间24小时
    console.log('d.toGMTString()',d.toGMTString())
    return d.toGMTString()
}

const handleUserRouter = (req,res) => {
    const method = req.method
    // login
    if(method === 'POST' && req.path === '/api/user/login') {
        const { username,password } = req.body
        const result = login(username,password)
        return result.then(data=>{
            if(data.username){
                // res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpire()}`)
                // 设置 session
                req.session.username = data.username
                req.session.realname = data.realname

                // 同步到 redis
                set(req.sessionId,req.session)
            
                
                console.log('req.session',req.session)
                return new SuccessModal(req.session)
            }
            return new ErrorModal('login error')
        })
    }

    // 登录验证测试
    // if(method === 'GET' && req.path ==='/api/user/login-test'){
    //     if(req.session.username){
    //         return  Promise.resolve( new SuccessModal({
    //             session:req.session
    //         }))
    //     }
    //     return Promise.resolve(new ErrorModal('login error'))
    // }

}

module.exports = handleUserRouter