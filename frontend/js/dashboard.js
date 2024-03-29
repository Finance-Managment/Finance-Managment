const userRole = localStorage.getItem('userRole')
const userToken = localStorage.getItem('userToken')
const userID = localStorage.getItem('userID')
const section = document.querySelector('.section')
const showIncome = document.createElement('button')
showIncome.innerText = 'Show Income'
showIncome.className = 'button_income'
const showOutcome = document.createElement('button')
showOutcome.innerText = 'Show Outcome'
showOutcome.className = 'button_outcome'
const showSavings = document.createElement('button')
showSavings.innerText = 'Show Savings'
showSavings.className = 'button_savings'
const cardHolder = document.createElement('div')
section.append(showIncome, showOutcome, showSavings, cardHolder)
const incomeCatagories = [
    'Salary',
    'Investments',
    'Business',
    'Freelance',
    'Rent',
    'Royalties',
    'Other',
]
const outcomeCatagories = [
    'Rent',
    'Utilities',
    'Food',
    'Transportation',
    'Entertainment',
    'Healthcare',
    'Education',
    'Debt',
    'Other',
]
showIncome.addEventListener('click', (event) => {
    document.querySelectorAll('.card').forEach((el) => el.remove())
    const incomeCard = document.createElement('div')
    incomeCard.className = 'card'
    const dropdownSelect = document.createElement('select')
    incomeCatagories.forEach((el) => {
        const dropdownOption = document.createElement('option')
        dropdownOption.setAttribute('value', el)
        dropdownOption.innerText = el
        dropdownSelect.append(dropdownOption)
    })
    const incomeField = document.createElement('input')
    incomeField.placeholder = 'Enter Income'
    incomeField.setAttribute('type', 'number')
    const submitButton = document.createElement('button')
    submitButton.innerText = 'Submit'
    submitButton.addEventListener('click', (event) => {
        const addIncome = async () => {
            const sendIncome = fetch('/api/incomes', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: `${dropdownSelect.value}`,
                    amount: `${Math.abs(incomeField.value)}`,
                }),
            })
        }
        addIncome()
        console.log(dropdownSelect.value, incomeField.value)
        alert('Income Added')
        getIncomes()
        incomeField.value = ''
    })
    incomeCard.append(dropdownSelect, incomeField, submitButton)
    const getIncomes = async () => {
        const allIncomes = await fetch(`/api/incomes/${userID}/all`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
        document.querySelectorAll('.income__info').forEach((el) => el.remove())
        let total = 0
        const incomeInfo = document.createElement('div')
        incomeInfo.className = 'income__info'
        const incomeData = await allIncomes.json()
        incomeObject = {}
        incomeData.data.forEach((el) => {
            if (incomeObject[el.category] == null) {
                incomeObject[el.category] = el.amount
            } else {
                incomeObject[el.category] += el.amount
            }
        })
        for (el in incomeObject) {
            const infoLine = document.createElement('div')
            const category = document.createElement('div')
            category.innerText = `${el}:`
            category.className = 'category__info'
            const amount = document.createElement('div')
            total += Math.abs(incomeObject[el])
            amount.innerText = `+${incomeObject[el]}€`
            amount.className = 'amount__info'
            amount.className += ' income'
            infoLine.append(category, amount)
            incomeInfo.append(infoLine)
        }
        const totalIncome = document.createElement('div')
        const totalCategory = document.createElement('div')
        totalCategory.innerText = 'Total:'
        const totalValue = document.createElement('div')
        totalValue.innerText = `+${total}€`
        totalValue.className = 'amount__info income'
        totalIncome.append(totalCategory, totalValue)
        incomeInfo.append(totalIncome)
        incomeCard.append(incomeInfo)
    }
    getIncomes()
    cardHolder.append(incomeCard)
})
showOutcome.addEventListener('click', (event) => {
    document.querySelectorAll('.card').forEach((el) => el.remove())
    const outcomeCard = document.createElement('div')
    outcomeCard.className = 'card'
    const dropdownSelect = document.createElement('select')
    outcomeCatagories.forEach((el) => {
        const dropdownOption = document.createElement('option')
        dropdownOption.setAttribute('value', el)
        dropdownOption.innerText = el
        dropdownSelect.append(dropdownOption)
    })
    const outcomeField = document.createElement('input')
    outcomeField.placeholder = 'Enter Outcome'
    outcomeField.setAttribute('type', 'number')
    const submitButton = document.createElement('button')
    submitButton.innerText = 'Submit'
    submitButton.addEventListener('click', (event) => {
        const addOutcome = async () => {
            const sendOutcome = fetch('/api/outcomes', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: `${dropdownSelect.value}`,
                    amount: `${Math.abs(outcomeField.value)}`,
                }),
            })
        }
        addOutcome()
        console.log(dropdownSelect.value, outcomeField.value)
        alert('Outcome Added')
        getOutcomes()
        outcomeField.value = ''
    })
    outcomeCard.append(dropdownSelect, outcomeField, submitButton)
    const getOutcomes = async () => {
        const allOutcomes = await fetch(`/api/outcomes/${userID}/all`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
        document.querySelectorAll('.outcome__info').forEach((el) => el.remove())
        let total = 0
        const outcomeInfo = document.createElement('div')
        outcomeInfo.className = 'outcome__info'
        const outcomeData = await allOutcomes.json()
        outcomeObject = {}
        outcomeData.data.forEach((el) => {
            if (outcomeObject[el.category] == null) {
                outcomeObject[el.category] = el.amount
            } else {
                outcomeObject[el.category] += el.amount
            }
        })
        for (el in outcomeObject) {
            const infoLine = document.createElement('div')
            const category = document.createElement('div')
            category.innerText = `${el}:`
            category.className = 'category__info'
            const amount = document.createElement('div')
            total += Math.abs(outcomeObject[el])
            amount.innerText = `-${outcomeObject[el]}€`
            amount.className = 'amount__info'
            amount.className += ' outcome'
            infoLine.append(category, amount)
            outcomeInfo.append(infoLine)
        }
        const totalOutcome = document.createElement('div')
        const totalCategory = document.createElement('div')
        totalCategory.innerText = 'Total:'
        const totalValue = document.createElement('div')
        totalValue.innerText = `-${total}€`
        totalValue.className = 'amount__info outcome'
        totalOutcome.append(totalCategory, totalValue)
        outcomeInfo.append(totalOutcome)
        outcomeCard.append(outcomeInfo)
    }
    getOutcomes()
    cardHolder.append(outcomeCard)
})
showSavings.addEventListener('click', (event) => {
    document.querySelectorAll('.card').forEach((el) => el.remove())
    const savingCard = document.createElement('div')
    savingCard.className = 'card'
    const savingDescriptionField = document.createElement('input')
    savingDescriptionField.placeholder = 'Enter Saving Goal'
    savingDescriptionField.setAttribute('type', 'text')
    const savingMonthsField = document.createElement('input')
    savingMonthsField.placeholder = 'Enter Saving Months'
    savingMonthsField.setAttribute('type', 'number')
    const savingAmountField = document.createElement('input')
    savingAmountField.placeholder = 'Enter Saving Amount'
    savingAmountField.setAttribute('type', 'number')
    const submitButton = document.createElement('button')
    submitButton.innerText = 'Submit'
    submitButton.addEventListener('click', async (event) => {
        let outcomesRef
        const addSavingToOutcomes = async () => {
            const sendOutcome = await fetch('/api/outcomes', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: `Savings`,
                    amount: `${~~(
                        savingAmountField.value / savingMonthsField.value
                    )}`,
                }),
            })
            outcomesRef = (await sendOutcome.json())._id
        }
        await addSavingToOutcomes()
        const addSaving = async () => {
            const sendSaving = await fetch('/api/savings', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: `${savingDescriptionField.value}`,
                    months: `${savingMonthsField.value}`,
                    amount: `${Math.abs(savingAmountField.value)}`,
                    outcomesRef: `${outcomesRef}`,
                }),
            })
        }
        addSaving()
        console.log(
            savingDescriptionField.value,
            savingMonthsField.value,
            savingAmountField.value
        )
        alert('Saving Added')
        getSavings()
        savingDescriptionField.value = ''
        savingMonthsField.value = ''
        savingAmountField.value = ''
    })
    savingCard.append(
        savingDescriptionField,
        savingMonthsField,
        savingAmountField,
        submitButton
    )
    const getSavings = async () => {
        const allSavings = await fetch(`/api/savings/${userID}/all`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
        document.querySelectorAll('.saving__info').forEach((el) => el.remove())
        let monthsTotal = 0
        let total = 0
        const savingInfo = document.createElement('div')
        savingInfo.className = 'saving__info'
        const savingData = await allSavings.json()
        savingData.data.forEach((el) => {
            const infoLine = document.createElement('div')
            const description = document.createElement('div')
            description.innerText = `Goal: ${el.description}`
            description.className = 'description__info'
            const months = document.createElement('div')
            months.innerText = `Time to save:  ${el.months} months`
            months.className = 'months__info'
            const monthAmount = document.createElement('div')
            monthsTotal += ~~(el.amount / el.months)
            monthAmount.innerText = `This month amount:  ${~~(
                el.amount / el.months
            )}€`
            monthAmount.className = 'monthAmount__info'
            const amount = document.createElement('div')
            total += Math.abs(el.amount)
            amount.innerText = `Total amount:  ${Math.abs(el.amount)}€`
            amount.className = 'amount__info'
            const deleteButtonContainer = document.createElement('div')
            const deleteButton = document.createElement('button')
            deleteButton.type = 'submit'
            deleteButton.innerText = 'delete'
            deleteButton.addEventListener('click', async () => {
                const deleteSaving = await fetch(`api/savings/${el._id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })
                const deleteOutcome = await fetch(
                    `api/outcomes/${el.outcomesRef}`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                )
                infoLine.remove()
            })
            deleteButtonContainer.append(deleteButton)
            infoLine.append(
                description,
                months,
                monthAmount,
                amount,
                deleteButtonContainer
            )
            savingInfo.append(infoLine)
        })
        const totalSaving = document.createElement('div')
        totalSaving.innerText = `This month amount:  ${monthsTotal}€\n Total amount left:  ${total}€`
        savingInfo.append(totalSaving)
        savingCard.append(savingInfo)
    }
    getSavings()
    cardHolder.append(savingCard)
})
if (userRole == 'admin') {
    const getUsersButton = document.createElement('button')
    getUsersButton.innerText = 'Get All Users'
    getUsersButton.className = 'button'
    section.append(getUsersButton)
    let userListVisible = false

    getUsersButton.addEventListener('click', (event) => {
        if (userListVisible) {
            // If user list is currently visible, hide it
            document.querySelector('.user__list').style.display = 'none'
            userListVisible = false
        } else {
            // If user list is currently hidden, display it
            const getAllUsers = async () => {
                const adminResponse = await fetch('/api/users/users', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })

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
                        const userAccounts = document.createElement('div')
                        userAccounts.className = 'account__info'
                        const userId = el._id
                        const removeButton = document.createElement('button')
                        removeButton.innerText = 'Remove'
                        removeButton.className = 'remove__button'
                        removeButton.addEventListener('click', (event) => {
                            const deleteUser = async () => {
                                const deleteUserById = await fetch(
                                    `/api/users/${userId}`,
                                    {
                                        method: 'DELETE',
                                        headers: {
                                            Authorization: `Bearer ${userToken}`,
                                        },
                                    }
                                )
                            }
                            deleteUser()
                            userCard.remove()
                        })
                        userCard.append(
                            userName,
                            userEmail,
                            userAccounts,
                            removeButton
                        )
                        userList.append(userCard)
                    }
                })
            }
            getAllUsers()
            userListVisible = true
        }
    })
}
