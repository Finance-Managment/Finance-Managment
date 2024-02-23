const dashbtn = document.getElementById('dashboard')
const UserID = localStorage.getItem('userID')
dashbtn.addEventListener('click', () => {
    if (UserID) {
        window.location.href = 'dashboard.html'
    } else {
        window.location.href = 'index.html'
    }
})
