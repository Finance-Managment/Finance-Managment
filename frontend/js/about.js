const dashbtn = document.getElementById('dashboard')
const dashboard = document.getElementById('dashboard-home')
const UserID = localStorage.getItem('userID')
dashbtn.addEventListener('click', () => {
    if (UserID) {
        window.location.href = '/dashboard'
    } else {
        window.location.href = '/'
    }
})
dashboard.addEventListener('click', () => {
    if (UserID) {
        window.location.href = '/dashboard'
    } else {
        window.location.href = '/'
    }
})
