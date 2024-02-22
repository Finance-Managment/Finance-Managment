const refreshMessage = 5000
function updateMessage() {
    checkIncomeOutcome()
}
setInterval(updateMessage, refreshMessage)

const checkIncomeOutcome = async () => {
    try {
        const incomeData = await getIncomes()
        const outcomeData = await getOutcomes()

        if (outcomeData.totalAmount > incomeData.totalAmount) {
            const balance = incomeData.totalAmount - outcomeData.totalAmount
            const message = `Warning!: Your total income is ${incomeData.totalAmount}€ and your total outcome is ${outcomeData.totalAmount}€, Your balance is ${balance}€`
            console.log(message)
        } else if (outcomeData.totalAmount < incomeData.totalAmount) {
            const balance = incomeData.totalAmount - outcomeData.totalAmount
            const message = `Great!: Your total income is ${incomeData.totalAmount}€ and your total outcome is ${outcomeData.totalAmount}€, Your balance is ${balance}€`
            console.log(message)
        } else {
            const balance = outcomeData.totalAmount - incomeData.totalAmount
            console.log(`Warning!:Your balance is ${balance}€`)
        }
    } catch (err) {
        console.log(`error, ${err}`)
    }
}
///
const messageContainer = document.createElement("div")
function displayMessage(message) {
    document.getElementById('messageContainer').innerText = message;
}





checkIncomeOutcome()
