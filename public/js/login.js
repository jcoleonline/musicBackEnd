const form = document.getElementById('loginForm')

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const login = {
        username: username.value,
        password: password.value,
    }
    try {
        const response = await fetch('/user-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        });
        const data = await response.json();
        if (data.username) {
            window.location.replace('/user/:id');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});