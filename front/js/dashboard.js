const loginFormSubmit = document.getElementById('loginFormSubmit')
const loginForm = document.getElementById('loginForm')
loginForm.style.height = 'auto'
loginForm.style.position = 'relative'
loginFormSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    const getUser = async () => {
        const emailInput = document.getElementById('loginFormEmailInput').value
        const passwordInput = document.getElementById(
            'loginFormPasswordInput'
        ).value
        console.log(emailInput, passwordInput)
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: `${emailInput}`,
                password: `${passwordInput}`,
            }),
        })
        if (response.status == 400) {
            console.log('Netinkama informacija')
        } else {
            const data = await response.json()
            console.log(data)
            console.log('viskas ok')
            document.getElementById('loginForm').remove()
            if (data.role == 'admin') {
                const section = document.querySelector('.section')
                const getUsersButton = document.createElement('button')
                getUsersButton.innerText = 'Get All Users'
                getUsersButton.className = 'button'
                section.append(getUsersButton)
                getUsersButton.addEventListener('click', (event) => {
                    console.log(data.token)
                    const getAllUsers = async () => {
                        const adminResponse = await fetch(
                            'http://localhost:3000/api/users/users',
                            {
                                method: 'GET',
                                headers: {
                                    Authorization: `Bearer ${data.token}`,
                                },
                            }
                        )
                        document
                            .querySelectorAll('.user__list')
                            .forEach((el) => el.remove())
                        const adminData = await adminResponse.json()
                        const userList = document.createElement('div')
                        userList.className = 'user__list'
                        document.querySelector('.section').append(userList)
                        adminData.forEach((el) => {
                            if (el.role != 'admin') {
                                const userCard = document.createElement('div')
                                userCard.className = 'user__card'
                                const userName = document.createElement('div')
                                userName.innerText = el.firstname
                                const userEmail = document.createElement('div')
                                userEmail.innerText = el.email
                                const userAccounts =
                                    document.createElement('div')
                                userAccounts.className = 'account__info'
                                const removeButton =
                                    document.createElement('button')
                                removeButton.innerText = 'Remove'
                                removeButton.className = 'remove__button'
                                removeButton.addEventListener(
                                    'click',
                                    (event) => {
                                        // Remove button event
                                    }
                                )
                                userCard.append(
                                    userName,
                                    userEmail,
                                    userAccounts,
                                    removeButton
                                )
                                userList.append(userCard)
                                console.log(el)
                            }
                        })
                    }
                    getAllUsers()
                })
                console.log('Admin')
            }
        }
    }
    getUser()
})
