var express =require('express');
//引入socket.io
var socket = require('socket.io')
var app = express();

var server = app.listen(5000,()=>{
    console.log('服务器成功开启。。。')
})

//让服务器识别静态文件 表示在public 文件夹中
app.use(express.static('public'))

//设置实例化 socket.io
var io = socket(server);
io.on('connection',(socket)=>{
    console.log(`监听connection 已经与socket链接成功${socket.id}`);
    // 获取客户端发送的数据(监听聊天事件)
    socket.on('chat',(data)=>{
     io.sockets.emit('chat',data)
    })
    //获取客户端发送的数据(监听键盘输入事件)
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })
})    