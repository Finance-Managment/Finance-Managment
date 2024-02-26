const dashbtn = document.getElementById('dashboard')
const dashboard = document.getElementById('dashboard-home')
const UserID = localStorage.getItem('userID')
dashbtn.addEventListener('click', () => {
    if (UserID) {
        window.location.href = 'dashboard.html'
    } else {
        window.location.href = 'index.html#top'
    }
})
dashboard.addEventListener('click', () => {
    if (UserID) {
        window.location.href = 'dashboard.html'
    } else {
        window.location.href = 'index.html#top'
    }
})
