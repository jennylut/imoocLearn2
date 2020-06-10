const fs = require('fs')
const path = require('path')

// 写日子
function writeLog(writeStream,log){
    writeStream.write(log +'\n')
}

// 生成write Stream
function createStream(fileName) {
    const fullFileName = path.join(__dirname,'../','../','logs',fileName)
    const writeStream = fs.createReadStream(fullFileName,{
        flags:'a'
    })
    return writeStream
}

//  写访问日志
const accessWriteStream = createStream('acces.log')
function access(log) {
    writeLog(accessWriteStream,log)
}

module.exports = {
    access
}