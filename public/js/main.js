const form = document.getElementById("form")
const messageInput = document.getElementById("new-message")
const messageDisplay = document.getElementById("new-message-display")
const username = document.getElementById("username")
const chatList = document.querySelector('.chatbox-messages')

form.addEventListener("submit", sendChat)

window.addEventListener("DOMContentLoaded", async () => {
    try {
        let oldText = JSON.parse(localStorage.getItem("messages"));

        let lastMsgId;
        if (!oldText || oldText.length === 0) {
            oldText = [];
            lastMsgId = 0;
        } else {
            lastMsgId = oldText[oldText.length - 1].id;
        }

        const token = localStorage.getItem("token")
        const response = await axios.get(
            `http://localhost:3000/chat/fetchchat/${lastMsgId}`,
            { headers: { "Authorization": token } }
        );
        if (response.status == 200) {
            const newMsg = response.data.chat;

            let msg = oldText.concat(newMsg);

            if (msg.length > 20) {
                msg = msg.slice(msg.length - 20, msg.length);
            }
            localStorage.setItem("messages", JSON.stringify(msg));
            localStorage.setItem("lastChatId", lastMsgId)
            //chatList.innerHTML = ""
            msg.forEach(element => {
                updateChatList(element.message)
            });
        }
        fetchChatAndShow();
    } catch (err) {
        console.log(err)
    }
})
async function sendChat(e) {
    try {
        e.preventDefault()
        const newMessage = {
            message: messageInput.value
        }
        const token = localStorage.getItem("token")
        const serverResponse = await axios.post("http://localhost:3000/chat/sendmessage",
            newMessage,
            { headers: { "Authorization": token } })
        //updateChatList(serverResponse.data.message)
        messageInput.value = ""
    } catch (error) {
        console.log(error)
    }
}

function updateChatList(message) {
    const newMessageEl = document.createElement('div')
    newMessageEl.classList.add('chatbox-message', 'sent')
    newMessageEl.innerHTML = `
        <span>You:</span>
        <p>${message}</p>
    `
    chatList.appendChild(newMessageEl)
}

async function fetchChatAndShow() {
    setInterval(async () => {
        let oldText = JSON.parse(localStorage.getItem("messages"));

        let lastMsgId = localStorage.getItem("lastChatId");
        if (!oldText || oldText.length === 0) {
            oldText = [];
            lastMsgId = 0;
        } else {
            lastMsgId = oldText[oldText.length - 1].id;
        }

        const token = localStorage.getItem("token")
        const response = await axios.get(
            `http://localhost:3000/chat/fetchchat/${lastMsgId}`,
            { headers: { "Authorization": token } }
        );
        if (response.status == 200) {
            const newMsg = response.data.chat;

            let msg = oldText.concat(newMsg);

            if (msg.length > 20) {
                msg = msg.slice(msg.length - 20, msg.length);
            }
            localStorage.setItem("messages", JSON.stringify(msg));
            //chatList.innerHTML = ""
            newMsg.forEach(element => {
                updateChatList(element.message)
            });
        }
    }, 1000)
}
