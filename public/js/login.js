const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const form = document.getElementById('login-form')

form.addEventListener("submit", login)

async function login(e) {
    try {
        e.preventDefault();
        const loginCredentials = {
            email: emailInput.value,
            password: passwordInput.value
        }
        const serverResponse = await axios.post("http://localhost:3000/login", loginCredentials)
        console.log(serverResponse)
    } catch (error) {
        console.log(error)
    }
}