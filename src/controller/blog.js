const { exec } = require('../db/mysql')

// const getList = (author,keyword) => {
//     let sql = "select * from blogs"
//     // if(author){
//     //     sql += `and author = '${author}' `
//     // }
//     // if(keyword){
//     //     sql += `and title like '%${keyword}' `
//     // }
//     // sql += `order by createtime desc`

//     return exec(sql)
// }
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)
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

// add blog
const newBlog = (blogData ={}) => {
    // console.log('new blog data----',blogData)
    return {
        id:3,// 新建博客id为3
    
    }
}

// update blog
const updateBlog = (id,blogData={}) => {
    console.log('blogData---',blogData)
    return true // update success
}

// delete blog

const deleteBlog = (id) => {
    console.log('id---',id)
    return true // delete success
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}