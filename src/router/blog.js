const { getList, getDetail, newBlog } = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/resModel') 

const handleBlogRouter = (req,res) => {
    const method = req.method
   
    
    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author,keyword)
        return new SuccessModal(listData)
    }
    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        const data = getDetail(id)
        return new SuccessModal(data)
        // return {
        //     msg:'这是获取博客详情的接口'
        // }
    }
    // 新增博客
    if(method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModal(data)
        // return {
        //     msg:'这是新增博客详情的接口'
        // }
    }
    // update博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg:'这是update博客详情的接口'
        }
    }
    // delete博客
    if(method === 'POST' && req.path === '/api/blog/delete') {
        return {
            msg:'这是delete博客详情的接口'
        }
    }

}


module.exports = handleBlogRouter