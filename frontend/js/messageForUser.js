const refreshMessage = 5000

const checkIncomeOutcome = async () => {
    try {
        const incomeData = await getIncomes()
        const outcomeData = await getOutcomes()

        let message
        let messageClass

        if (outcomeData.totalAmount > incomeData.totalAmount) {
            const balance = incomeData.totalAmount - outcomeData.totalAmount
            message = `Warning! Your total income is ${incomeData.totalAmount}€ and your total outcome is ${outcomeData.totalAmount}€, Your balance is ${balance}€`
            messageClass = 'warning'
        } else if (outcomeData.totalAmount < incomeData.totalAmount) {
            const balance = incomeData.totalAmount - outcomeData.totalAmount
            message = `Great! Your total income is ${incomeData.totalAmount}€ and your total outcome is ${outcomeData.totalAmount}€, Your balance is ${balance}€`
            messageClass = 'success'
        } else {
            const balance = outcomeData.totalAmount - incomeData.totalAmount
            message = `Warning! Your balance is ${balance}€`
            messageClass = 'caution'
        }
        console.log(message)

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
    } catch (err) {
        console.log(`error, ${err}`)
    }
}

// Execute function initially
checkIncomeOutcome()

// Observe the changes made for outcomes/incomes
const observer = new MutationObserver(checkIncomeOutcome)
observer.observe(document.body, { childList: true, subtree: true })

// Refresh message periodically
setInterval(checkIncomeOutcome, refreshMessage)
