const getList = (author,keyword) => {
    return [
        {
            id:1,
            title:'标题A',
            content:'特特特图teste',
            createTime:'1588836478084',
            author:'zhangsan'
        },
        {
            id:2,
            title:'标题2',
            content:'特特特图teste222',
            createTime:'1588836426640',
            author:'lisi'
        }
    ]
}

const getDetail = (id) => {
    return [
        {
            id:1,
            title:'标题A',
            content:'特特特图teste',
            createTime:'1588836478084',
            author:'zhangsan'
        }
    ]
}

const newBlog = (blogData ={}) => {
    console.log('new blog data----',blogData)
    return {
        id:3,// 新建博客id为3
    
    }
}

module.exports = {
    getList,
    getDetail,
    newBlog
}