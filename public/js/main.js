const form = document.getElementById("form")
const messageInput = document.getElementById("new-message")
const messageDisplay = document.getElementById("new-message-display")
const username = document.getElementById("username")
const chatList = document.querySelector('.chatbox-messages')


form.addEventListener("submit", sendChat)

async function sendChat(e) {
    try {
        e.preventDefault()
        const newMessage = {
            message: messageInput.value
        }
        const token = localStorage.getItem("token")
        const serverResponse = await axios.post("http://localhost:3000/chat/sendmessage",
            newMessage,
            { headers: { Authorization: token } })
        console.log(serverResponse.data.message)
        updateChatList(serverResponse.data.message)
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