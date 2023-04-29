const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const passwordInput = document.getElementById("password")
const form = document.getElementById("form")

console.log(form)
form.addEventListener("submit", onSubmit)

async function onSubmit(e) {
    try {
        e.preventDefault();
        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            password: passwordInput.value
        }
        const serverResponse = await axios.post("http://localhost:3000/signup", userData);
        console.log(serverResponse)
    } catch (error) {
        console.log(error)
    }
}