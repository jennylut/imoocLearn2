const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理post Data
const getPostData = (req) => {
    const promise = new Promise((resolve,reject)=>{
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if (req.headers['content-type'] !=='application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data',chunk => {
            postData += chunk.toString()
        })
        req.on('end',()=>{
            if(!postData){
                resolve({})
                return 
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandle = (req,res) => {
    // process.env.NODE_ENV
    // 设置返回格式
    res.setHeader('Content-type','application/json')
    // 获取path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[1]) // k1=v1;k2=v2

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(";").forEach(item => {
        if(!item){
            return
        }
        const arr = item.split("=")
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // 处理 post Data
    getPostData(req).then(postData =>{
        req.body = postData
    
        //处理blog路由
        // const blogData = handleBlogRouter(req,res)
        // if(blogData){
        //     res.end(JSON.stringify(blogData))
        //     return
        // }
        const blogResult = handleBlogRouter(req, res)
        console.log('blogResult',blogResult)
        if(blogResult) {
            blogResult.then(blogData =>{
                console.log('11111')
                res.end(JSON.stringify(blogData))
            })
            console.log('22222')
            return
        }
    

        // 处理user路由
        // const userData = handleUserRouter(req,res)
        // if(userData) {
        //     res.end(JSON.stringify(userData))
        //     return
        // }

        const userResult = handleUserRouter(req,res)
        if(userResult){
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
            })
            return
        }
        // 未命中路由 404
        res.writeHead(404,{"Content-type":"text/plain"})
        res.write("404 Not Fund \n")
        res.end()
    })
}


module.exports = serverHandle