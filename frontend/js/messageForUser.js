const refreshMessage = 5000
// function updateMessage() {
//     checkIncomeOutcome()
// }
// setInterval(updateMessage, refreshMessage)

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
            messageParagraph.classList.add(messageClass)
        } else {
            const newMessageParagraph = document.createElement('p')
            newMessageParagraph.id = 'messageForUser'
            newMessageParagraph.textContent = message
            newMessageParagraph.classList.add(messageClass)

            const messageContainer = document.getElementById('message')
            messageContainer.appendChild(newMessageParagraph)
        }
    } catch (err) {
        console.log(`error, ${err}`)
    }
}
///
checkIncomeOutcome()
//to observe the changes made for outcomes/incomes
const observer = new MutationObserver(() => {
    checkIncomeOutcome()
})

observer.observe(document.body, { childList: true, subtree: true })
setInterval(checkIncomeOutcome, refreshMessage)
