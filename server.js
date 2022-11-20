const app = require('express')();
const server = require('http').createServer(app)
const {Server} = require('socket.io');
const io = new Server(server);

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html')
})

io.on('connection',socket => {
  console.log(socket.handshake.query.username+'进入了聊天室',socket.handshake.query.username)
  socket.on('chat message',msg=>{
    console.log(msg)
    io.emit('chat message',{name:socket.handshake.query.username,msg})
  })
  socket.on('disconnect',()=>{
    console.log('这个人离开了聊天室');
  })
})

server.listen('5504',()=>{
  console.log('聊天室服务开启在5504了');
})
