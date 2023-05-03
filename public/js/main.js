const form = document.getElementById("form")
const messageInput = document.getElementById("new-message")
const messageDisplay = document.getElementById("new-message-display")
const username = document.getElementById("username")
const chatList = document.querySelector('.chatbox-messages')

form.addEventListener("submit", sendChat)

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const token = localStorage.getItem("token")
        let lastMsgId = localStorage.getItem("lastChatId");
        console.log(lastMsgId, "this is last message id")
        //let lastMsgId;
        // console.log(oldText);
        if (!lastMsgId) {
            //oldText = [];
            lastMsgId = 0;
        }
        const getAllChat = await axios.get(
            `http://localhost:3000/chat/getAllChat`
            , { headers: { "Authorization": token } });
        //const getAllChat = await axios.get("http://localhost:3000/chat/fetchChat",
        //  )
        //console.log(getAllChat, "this is get all chat")
        if (getAllChat.status == 200) {
            localStorage.setItem("lastChatId", getAllChat.data.lastChatId)
            getAllChat.data.chat.forEach(element => {
                updateChatList(element.message)
            });
            messageInput.value = ""
            fetchChatAndShow();
        }
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
        console.log(serverResponse.data.message)
        updateChatList(serverResponse.data.message)
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
        let lastMsgId = localStorage.getItem("lastChatId");
        if (!lastMsgId) {

            lastMsgId = 0;
        }
        const token = localStorage.getItem("token")
        const response = await axios.get(
            `http://localhost:3000/chat/fetchchat/${lastMsgId}`,
            { headers: { "Authorization": token } }
        );
        //console.log(response.data);
        if (response.status == 200) {
            localStorage.setItem("lastChatId", response.data.lastChatId)
            response.data.chat.forEach(element => {
                updateChatList(element.message)
            });
            messageInput.value = ""
        }

    }, 1000)
}
