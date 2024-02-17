/**
 * =============== SHOW SCROLL UP ===============
 *
 * @format
 */

const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350
        ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

// =============== REGISTER ===============

const signupButton = document.getElementById('signupFormSubmit')
signupButton.addEventListener('click', (event) => {
    event.preventDefault()
    const signupUser = async () => {
        const signupName = document.getElementById('signupFormNameInput').value
        const signupEmail = document.getElementById(
            'signupFormEmailInput'
        ).value
        const signupPassword = document.getElementById(
            'signupFormPasswordInput'
        ).value
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: `${signupName}`,
                email: `${signupEmail}`,
                password: `${signupPassword}`,
            }),
        })
        if (response.status == 400) {
            console.log('Netinkama informacija')
        } else {
            alert('vartotojas sukurtas')
        }
    }
    signupUser()
    document.getElementById('signupFormNameInput').value = ''
    document.getElementById('signupFormEmailInput').value = ''
    document.getElementById('signupFormPasswordInput').value = ''
})
