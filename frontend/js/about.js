const dashbtn = document.getElementById('dashboard')
const contactbtn = document.getElementById('contact')
const UserID = localStorage.getItem('userID')
dashbtn.addEventListener('click', () => {
    if (UserID) {
        window.location.href = 'dashboard.html'
    } else {
        window.location.href = 'index.html'
    }
})
// contactbtn.addEventListener('click', () => {
//     if (UserID) {
//         window.location.href = 'dashboard.html'
//     } else {
//         window.location.href = 'index.html'
//     }
// })
