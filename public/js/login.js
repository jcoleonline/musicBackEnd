const form = document.getElementById('loginForm')
const username = document.getElementById('username')
const password = document.getElementById('Password')

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const login = {
        username: username.value,
        password: password.value,
    }
    console.log(login)
    try {
        const response = await fetch('/user-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        });
        // const data = await response.json();
        // console.log(data)
        // if (data.username) {
        //     console.log(test)
            window.location.replace('/');
        //     console.log()
        // }
    } catch (error) {
        console.error('Error:', error);
    }

});
