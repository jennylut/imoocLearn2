const { SuccessModal, ErrorModal } = require('../model/resModel') 
const loginCheck = require('../controller/user')

const handleUserRouter = (req,res) => {
    const method = req.method


    // login
    if(method === 'POST' && req.path === '/api/user/login') {
        const { username,password } = req.body
        const result = loginCheck(username,password)
        return result.then(data=>{
            if(data.username){
                return new SuccessModal(result)
            }
            return new ErrorModal('login error')
        })
    }

}

module.exports = handleUserRouter