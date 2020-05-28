const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const connect = mysql.createConnection(MYSQL_CONF)

connect.connect()

// 统一执行sql 函数
function exec(sql) {
    const promise = new Promise((resolve,reject)=>{
        connect.query(sql,(err,result)=>{
            if(err){
                console.log('err---',err)
                reject(err)
                return
            }
            console.log('result---',result)
            resolve(result)
        })
    })
    return promise
}

// connect.end()

module.exports = {
    exec
}