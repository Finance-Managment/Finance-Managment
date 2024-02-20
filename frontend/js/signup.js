const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('signupFormNameInput').value;
    const email = document.getElementById('signupFormEmailInput').value;
    const password = document.getElementById('signupFormPasswordInput').value;

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstname: name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userRole', data.role);
            localStorage.setItem('userID', data._id);
            localStorage.setItem('userToken', data.token);

            window.location.href = "dashboard.html";
        } else {
            if (data && data.error) {
                alert("Negerai ivesti duomenys");
            } else {
                alert('Email already in use');
            }
        }
    } catch (error) {
        console.error('Error signing up:', error.message);
    }
});
