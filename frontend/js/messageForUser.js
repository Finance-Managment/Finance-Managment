const refreshMessage = 1000

const checkIncomeOutcome = async () => {
    try {
        const incomeData = await getIncomes()
        const outcomeData = await getOutcomes()

        let warningMessage
        let successMessage

        const balance = incomeData.totalAmount - outcomeData.totalAmount

        if (outcomeData.totalAmount > incomeData.totalAmount) {
            warningMessage = `Warning! Your total income is ${incomeData.totalAmount}€ and your total outcome is ${outcomeData.totalAmount}€. Your balance is ${balance}€.`
        } else if (outcomeData.totalAmount < incomeData.totalAmount) {
            successMessage = `Great! Your total income is ${incomeData.totalAmount}€, you've spent ${outcomeData.totalAmount}€, and your balance is ${balance}€.`

            // Check if the balance is above 80% after outcomes are deducted
            const highBalanceThreshold =
                0.8 * (incomeData.totalAmount - outcomeData.totalAmount)
            if (balance >= highBalanceThreshold) {
                successMessage += " You're doing great!"
            }
        } else {
            warningMessage = `Warning! Your balance is ${balance}€.`
        }

        displayWarningMessage(warningMessage)
        displaySuccessMessage(successMessage)
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

const checkBalance = async () => {
    try {
        const incomeData = await getIncomes()
        const outcomeData = await getOutcomes()
        const balance = incomeData.totalAmount - outcomeData.totalAmount
        const balancePercentage = (balance / incomeData.totalAmount) * 100

        let message
        let messageClass

        if (balance <= 0) {
            message = `Warning: Your balance is at 0% or below! Currently your balance is: ${balance}€!`
            messageClass = 'warning'
        } else if (balancePercentage <= 20) {
            message = `Attention: Your balance is between 0% and 20%. Currently your balance is: ${balance}€.`
            messageClass = 'attention'
        } else if (balancePercentage > 80) {
            message = `Great job! Your balance is over 80%. Currently your balance is: ${balance}€.`
            messageClass = 'success'
        } else {
            message = `Your balance is ${balance}€.`
            messageClass = 'success'
        }

        displayMessage(message, messageClass)
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

const displayWarningMessage = (message) => {
    const warningParagraph = document.getElementById('warningMessage')

    if (message && warningParagraph) {
        warningParagraph.textContent = message
    }
}

const displaySuccessMessage = (message) => {
    const successParagraph = document.getElementById('successMessage')

    if (message && successParagraph) {
        successParagraph.textContent = message
    }
}

const displayMessage = (message, messageClass) => {
    const messageParagraph = document.getElementById('messageForUser')

    if (messageParagraph) {
        messageParagraph.textContent = message
        messageParagraph.className = '' // Clear any existing classes
        messageParagraph.classList.add(messageClass)
    } else {
        const newMessageParagraph = document.createElement('p')
        newMessageParagraph.id = 'messageForUser'
        newMessageParagraph.textContent = message
        newMessageParagraph.classList.add(messageClass)

        const messageContainer = document.getElementById('messages')
        messageContainer.appendChild(newMessageParagraph)
    }
}

// Execute functions initially
checkIncomeOutcome()
checkBalance()

// Observe the changes made for outcomes/incomes
const observer = new MutationObserver(checkIncomeOutcome)
observer.observe(document.body, { childList: true, subtree: true })

// Refresh messages periodically
setInterval(() => {
    checkIncomeOutcome()
    checkBalance()
}, refreshMessage)
