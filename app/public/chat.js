// 实现服务端链接
var socket = io.connect('http://localhost:5000')
// 获取节点
var  message = document.getElementById('message')
handle= document.getElementById('handle')
btn = document.getElementById('send')
output =document.getElementById('output')
feedback = document.getElementById('feedback')
// 事件监听
btn.addEventListener('click',()=>{
    //实现客户向服务器发送数据
  socket.emit('chat',{
      message:message.value,
      handle:handle.value
  });
   message.value ='';
})
// 实现客户向服务器发送数据
message.addEventListener('keypress',()=>{
    
    socket.emit('typing',handle.value)
})

// 获取服务器的数据
socket.on('chat',(data)=>{
    feedback.innerHTML =""
    output.innerHTML +=`<p><strong>
    ${data.handle}:${data.message}
    </strong></p>`
})

//实现对方正在输入。。。
socket.on('typing',data=>{
    feedback.innerHTML=`<p><em>${data}正在输入。。。</em></p>`
})
