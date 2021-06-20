const app = require('express')();   // create a server
const http = require('http').createServer(app);

const cors = require('cors');
app.use(cors());

const io = require('socket.io')(http, {
    cors:{
        origin : '*',
    }
});

const userDB = [];

//gets executed whenever a socket id or any client gets connected to app.js(server)
io.on('connection', function(socket) 
{
    console.log(`${socket.id} connected`);
    //receives the meassage as sent
    socket.on("message-sent", function(msg)
    {
        let id = socket.id;
        let name;
        for(let i = 0; i < userDB.length; i++)
        {
            if(userDB[i].id == id)
            {
                name = userDB[i].name;
                break;
            }
        }
        //socket.broadcast.emit("receive-msg", msg);
        socket.broadcast.emit("receive-msg", {name : name , message : msg}); 
    })
    socket.on("new-user-connected", function(name)
    {
        let obj = {
            id : socket.id,
            name : name
        };
        userDB.push(obj);
        socket.broadcast.emit("new-user", name);
    })
    socket.on('disconnect', function()
    {
        let id = socket.id;
        let name;
        let idx;
        for(let i = 0; i < userDB.length; i++)
        {
            if(userDB[i].id == id)
            {
                name = userDB[i].name;
                idx = i;
                break;
            }
        }
        userDB.splice(idx, 1);   
        socket.broadcast.emit("left-chat", name);
    })
});

http.listen(3000, () => 
{
    console.log("listening on *:3000");
});