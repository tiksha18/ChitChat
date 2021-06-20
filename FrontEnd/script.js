const chatBox = document.querySelector(".chat-box");
const messageInput = document.querySelector("#chat");
const send = document.querySelector(".chat-send");

const name = prompt("Enter your Name : ");
//console.log(name);
socket.emit("new-user-connected", name);

messageInput.addEventListener("keypress" , function(e)
{
    let msg = messageInput.value;
    if(msg)
    {
        if(e.key == "Enter")
        {
            let chatItem = document.createElement("div");
            chatItem.classList.add("chat-item");
            chatItem.classList.add("right");
            chatItem.innerHTML = msg;
            chatBox.appendChild(chatItem);
            messageInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
            socket.emit("message-sent", msg);
        }
    }
})

send.addEventListener("click", function()
{
    let msg = messageInput.value;
    if(msg)
    {
        let chatItem = document.createElement("div");
        chatItem.classList.add("chat-item");
        chatItem.classList.add("right");
        chatItem.innerHTML = msg;
        chatBox.appendChild(chatItem);
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
        socket.emit("message-sent", msg);
    }
})