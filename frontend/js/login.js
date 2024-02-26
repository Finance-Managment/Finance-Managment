const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = document.getElementById('loginFormEmailInput').value
    const password = document.getElementById('loginFormPasswordInput').value

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('userRole', data.role)
            localStorage.setItem('userID', data._id)
            localStorage.setItem('userToken', data.token)

            window.location.href = '/dashboard'
        } else {
            alert('Negerai ivesti duomenys')
        }
    } catch (error) {
        alert('Error logging in:', error.message)
    }
})
