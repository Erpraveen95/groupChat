const form = document.getElementById("form")
const messageInput = document.getElementById("new-message")
const messageDisplay = document.getElementById("new-message-display")
const chatList = document.querySelector('.chatbox-messages')
const createGroup = document.getElementById("create-group-btn")
const groupList = document.getElementById("group-list")
const addMemberBtn = document.getElementById("add-member")
const logOut = document.getElementById("logout-btn")
const username = document.getElementById("current-user")

form.addEventListener("submit", sendChat)

createGroup.addEventListener("click", () => {
    window.location.href = "addGroup.html"
})
addMemberBtn.addEventListener("click", () => {
    window.location.href = "addMember.html"
})
groupList.addEventListener("click", (e) => {
    let groupId;
    //console.log(e.target.id)
    let previntervalId = localStorage.getItem("intervalId");
    if (previntervalId) {
        clearInterval(previntervalId);
    }
    if (e.target.nodeName == "BUTTON") {
        groupId = e.target.parentElement.id;
        return deleteGroup(groupId);
    }
    if (e.target.nodeName == "LI") {
        groupId = e.target.id
        localStorage.setItem("activeGroup", `${groupId}`)
    }
    let intervalId = setInterval(() => {
        fetchChatAndShow(groupId, intervalId);
    }, 1000);
})

window.addEventListener("DOMContentLoaded", async () => {
    try {
        displayGroupOnLoad();
    } catch (err) {
        console.log(err)
    }
})
async function sendChat(e) {
    try {
        e.preventDefault()
        const groupId = localStorage.getItem("activeGroup")
        const newMessage = {
            message: messageInput.value,
            groupId
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

function updateChatList(message, from) {
    const newMessageEl = document.createElement('div')
    if (from === username.textContent) {
        newMessageEl.classList.add('chatbox-message', 'sent')
        newMessageEl.innerHTML = `
        <span>You:</span>
        <p>${message}</p>
    `
    } else {
        newMessageEl.classList.add('chatbox-message')
        newMessageEl.innerHTML = `
        <span>${from}:</span>
        <p>${message}</p>
    `
    }
    chatList.appendChild(newMessageEl)
}

async function fetchChatAndShow(groupId, intervalId) {
    localStorage.setItem("intervalId", intervalId);
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
        chatList.innerHTML = ""
        const msgToShow = msg.filter((item) => item.groupId == groupId);
        msgToShow.forEach(element => {
            updateChatList(element.message, element.from)
        });
    }
}

async function displayGroupOnLoad() {
    try {
        const token = localStorage.getItem("token");
        const serverResponse = await axios.get(`http://localhost:3000/groups/getAllGroups`,
            { headers: { "Authorization": token } });

        username.textContent = serverResponse.data.username
        groupList.innerHTML = "";

        const groupName = serverResponse.data.groups;

        groupName.forEach((group) => {
            groupList.innerHTML += `
             <li id=${group.id}>${group.name}<button class="del btn-small">X</button></li>
             `
        });
    } catch (error) {
        console.log(error)
    }
}

logOut.addEventListener("click", () => {
    localStorage.removeItem("token")
    localStorage.removeItem("messages")
    localStorage.removeItem("activeGroup")
    window.location.href = "loginPage.html"
})