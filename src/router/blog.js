const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/resModel') 

// 统一登录验证

const loginCheck = (req) => {
    if(!req.session.username){
        return Promise.resolve(new ErrorModal('login error'))   
    }   
}

const handleBlogRouter = (req,res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const loginCheckResult = loginCheck(req)
        if(req.query.isadmin){
            // admin auth
            if(loginCheckResult){
                // 未登录
                return loginCheckResult
            }
            // 查询自己的博客
            author = req.session.username
        }

        // const listData = {}
        // return new SuccessModal(listData)

        const result = getList(author,keyword)
        return result.then(listData=>{
            return new SuccessModal(listData)
        })
    }
    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 未登录
            return loginCheckResult
        }
        const result = getDetail(id)
        return result.then(data=>{
            return new SuccessModal(data)
        })
    }
    // 新增博客
    if(method === 'POST' && req.path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 未登录
            return loginCheck
        }
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModal(data)
        })
    }
    // update博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id,req.body)
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 未登录
            return loginCheckResult
        }
        return result.then(data => {
            if(data) {
                return new SuccessModal(data)
            } else{
                return new ErrorModal('update error')
            }
        })
    
    }
    // delete博客
    if(method === 'POST' && req.path === '/api/blog/delete') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 未登录
            return loginCheckResult
        }
        const author = req.session.username
        const result = deleteBlog(id,author)
        return result.then(data => {
            if(data) {
                return new SuccessModal(data)
            }else{
                return new ErrorModal('delete error')
            }
        })
    }

}


module.exports = handleBlogRouter