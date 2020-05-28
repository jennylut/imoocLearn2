const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/resModel') 

const handleBlogRouter = (req,res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        // const listData = {}
        // return new SuccessModal(listData)

        const result = getList(author,keyword)
        return result.then(listData=>{
            return new SuccessModal(listData)
        })
    }
    // 获取博客详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id)
        return new SuccessModal(data)
    }
    // 新增博客
    if(method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModal(data)
    }
    // update博客
    if(method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id,req.body)
        if(result) {
            return new SuccessModal(result)
        }else{
            return new ErrorModal('update error')
        }
    
    }
    // delete博客
    if(method === 'POST' && req.path === '/api/blog/delete') {
        const result = deleteBlog(id)
        if(result) {
            return new SuccessModal(result)
        }else{
            return new ErrorModal('delete error')
        }
    }

}


module.exports = handleBlogRouter