const form = document.getElementById('registerForm')

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const register = {
        username: username.value,
        email: email.value,
        password: password.value,
    }
    try {
        const response = await fetch('/user-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(register),
        });
        const data = await response.json();
        if (data.message === 'success') {
            window.location.replace('/login');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});