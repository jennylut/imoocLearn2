const env = process.env.NODE_ENV // 环境变量

let MYSQL_CONF // 配置

if(env === 'dev' ) {
    MYSQL_CONF = {
        host:'127.0.0.1',
        user:'root',
        password:'Gyz@1024',
        port:'3306',
        database:'myblog'
    }
}

if(env === 'production') {
    MYSQL_CONF = {
        host:'127.0.0.1',
        user:'root',
        password:'Gyz@1024',
        port:'3306',
        database:'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}