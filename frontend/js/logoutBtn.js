const logoutButton = document.getElementById('logoutButton')

logoutButton.addEventListener('click', (event) => {
    event.preventDefault()

    localStorage.removeItem('userRole')
    localStorage.removeItem('userID')
    localStorage.removeItem('userToken')

    window.location.href = '/'
})
