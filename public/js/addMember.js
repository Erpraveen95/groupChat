const form = document.getElementById("my-form")
const emailInput = document.getElementById("email")
const closeBtn = document.getElementById("close-btn")

closeBtn.addEventListener("click", () => {
    window.location.href = "main.html"
})

form.addEventListener("submit", addMember)

async function addMember(e) {
    try {
        e.preventDefault();
        const groupId = localStorage.getItem("activeGroup")
        const newMemberData = {
            email: emailInput.value,
            groupId: groupId
        }
        console.log(newMemberData)
        const token = localStorage.getItem("token")
        const serverResponse = await axios.post("http://localhost:3000/admin/addMember",
            newMemberData,
            { headers: { "Authorization": token } })
        if (serverResponse.status === 200) {
            window.location.href = "main.html"
        }
    } catch (error) {
        console.log(error)
    }
}